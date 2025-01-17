import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as Highcharts from 'highcharts';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Subscription, Observable } from 'rxjs';

import { GetPlayerStatisticsRatingUsecase } from '../../../core/usecases/get-player-statistics-rating.usecase';
import { GetPlayerStatisticsHoursUsecase } from '../../../core/usecases/get-player-statistics-hours.usecase';
import { GetPlayerStatisticsReputationUsecase } from '../../../core/usecases/get-player-statistics-reputation.usecase';
import { GetPlayerStatisticsCombinedUsecase } from '../../../core/usecases/get-player-statistics-combined.usecase';
import { FilterSeriesByDaterangeUsecase } from '../../../core/usecases/filter-series-by-daterange.usecase';
import { NormalizeSeriesUsecase } from '../../../core/usecases/normalize-series.usecase';
import { PlayerStatisticsModelSeriesMapper } from '../../../core/models/player-statistics-model-series-mapper';
import { PlayerStatisticsCombinedModel } from 'src/app/core/models/player-statistics-combined.model';
import { take, tap } from 'rxjs/operators';

interface ChartSeriesView {
  name: string;
  color: string;
  data: number[];
}

Highcharts.setOptions({
  title: {
    style: {
      color: '#3f51b5',
    },
  },
});

@Component({
  selector: 'hota-profile-dashboard-chart',
  templateUrl: './profile-dashboard-chart.component.html',
  styleUrls: ['./profile-dashboard-chart.component.scss'],
})
export class ProfileDashboardChartComponent
  implements OnChanges, OnInit, OnDestroy
{
  @Input()
  public dateRange: { start: Date; end: Date };

  private charShouldResizeSubscription: Subscription;

  @Input() charShouldResize: Observable<void>;

  private mapper: PlayerStatisticsModelSeriesMapper =
    new PlayerStatisticsModelSeriesMapper();
  private id: number;

  constructor(
    private route: ActivatedRoute,
    private getPlayerStatisticsRatingUsecase: GetPlayerStatisticsRatingUsecase,
    private getPlayerStatisticsHoursUsecase: GetPlayerStatisticsHoursUsecase,
    private getPlayerStatisticsReputationUsecase: GetPlayerStatisticsReputationUsecase,
    private getPlayerStatisticsCombinedUsecase: GetPlayerStatisticsCombinedUsecase,
    private filterSeriesByDaterangeUsecase: FilterSeriesByDaterangeUsecase,
    private normalizeSeriesUsecase: NormalizeSeriesUsecase
  ) {}

  public updateChartFlag = false;
  public statisticsType = 'Rating';
  public chartType = 'line';
  public chartOptions: any = {};

  Highcharts: typeof Highcharts = Highcharts;

  reflowChart(): void {
    this.Highcharts.charts
      .filter((chart) => chart)
      .forEach((chart) => chart.reflow());
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.switchStatisticsByType(this.statisticsType);

    this.charShouldResizeSubscription = this.charShouldResize.subscribe(() => {
      setTimeout(() => {
        this.reflowChart();
      }, 0);
    });
  }

  ngOnDestroy(): void {
    this.charShouldResizeSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.dateRange) {
      return;
    }

    if (this.id && this.dateRange.start && this.dateRange.end) {
      this.switchStatisticsByType(this.statisticsType);
    }
  }

  formatDate(date: Date): string {
    return date.toDateString();
  }

  setChartSeries(categories: string[], series: ChartSeriesView[]): void {
    this.chartOptions = {
      title: { text: 'Player statistics' },
      chart: {
        type: this.chartType,
      },
      xAxis: {
        type: 'datetime',
        categories,
      },
      yAxis: {
        min: 0,
        title: {
          text: 'value',
        },
      },
      series,
    };
    this.updateChartFlag = true;
  }

  setStatistics(combinedStatistics: PlayerStatisticsCombinedModel): void {
    const ratingSeries = this.mapper.mapFromRating(combinedStatistics.rating);
    const hoursSeries = this.mapper.mapFromHours(combinedStatistics.hours);
    const reputationSeries = this.mapper.mapFromReputation(
      combinedStatistics.reputation
    );

    const dates = [
      ...ratingSeries.timeStamps,
      ...hoursSeries.timeStamps,
      ...reputationSeries.timeStamps,
    ];
    const min = dates.reduce((a, b) => (a < b ? a : b));
    const max = dates.reduce((a, b) => (a > b ? a : b));

    const start = this.dateRange.start ? this.dateRange.start : min;
    const end = this.dateRange.end ? this.dateRange.end : max;

    forkJoin({
      rating: this.filterSeriesByDaterangeUsecase.execute({
        dateFrom: start,
        dateTo: end,
        series: ratingSeries,
      }),
      hours: this.filterSeriesByDaterangeUsecase.execute({
        dateFrom: start,
        dateTo: end,
        series: hoursSeries,
      }),
      reputation: this.filterSeriesByDaterangeUsecase.execute({
        dateFrom: start,
        dateTo: end,
        series: reputationSeries,
      }),
    }).subscribe((data) => {
      this.normalizeSeriesUsecase
        .execute([data.rating, data.hours, data.reputation])
        .subscribe((normalized) => {
          const series: ChartSeriesView[] = [];

          if (normalized.series[0].data.length > 0) {
            series.push({
              name: 'Rating',
              color: '#3f51b5',
              data: normalized.series[0].data,
            });
          }

          if (normalized.series[1].data.length > 0) {
            series.push({
              name: 'Hours',
              color: '#9c1446',
              data: normalized.series[1].data,
            });
          }

          if (normalized.series[2].data.length > 0) {
            series.push({
              name: 'Reputation',
              color: '#2e8c31',
              data: normalized.series[2].data,
            });
          }

          this.setChartSeries(
            normalized.dates.map((item) => this.formatDate(item)),
            series
          );
        });
    });
  }

  switchSeriesDisplayMode(type: string): void {
    this.chartType = type;
    this.chartOptions.chart.type = type;
    this.updateChartFlag = true;
  }

  switchSeriesColor({ target }): void {
    if (target.textContent === 'Primary') {
      this.chartOptions.series.map(
        (data: ChartSeriesView) => (data.color = '#3f51b5')
      );
    } else {
      this.chartOptions.series.map(
        (data: ChartSeriesView) => (data.color = target.textContent)
      );
    }

    this.updateChartFlag = true;
  }

  switchStatisticsByType(statistics: string): void {
    this.statisticsType = statistics;

    switch (statistics) {
      case 'Rating':
        this.getPlayerStatisticsRatingUsecase
          .execute(this.id)
          .pipe(
            tap((data) => {
              this.setStatistics({
                rating: data,
                reputation: [],
                hours: [],
              });
            }),
            take(1)
          )
          .subscribe();
        break;
      case 'Reputation':
        this.getPlayerStatisticsReputationUsecase
          .execute(this.id)
          .pipe(
            tap((data) => {
              this.setStatistics({
                rating: [],
                reputation: data,
                hours: [],
              });
            }),
            take(1)
          )
          .subscribe();
        break;
      case 'Hours':
        this.getPlayerStatisticsHoursUsecase
          .execute(this.id)
          .pipe(
            tap((data) => {
              this.setStatistics({
                rating: [],
                reputation: [],
                hours: data,
              });
            }),
            take(1)
          )
          .subscribe();
        break;
      case 'Combined':
        this.getPlayerStatisticsCombinedUsecase
          .execute(this.id)
          .pipe(
            tap((data) => {
              this.setStatistics(data);
            }),
            take(1)
          )
          .subscribe();
        break;
    }
  }

  setStatisticsMode({ target }): void {
    this.switchStatisticsByType(target.textContent);
  }
}
