import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as Highcharts from 'highcharts';
import {PlayersService} from '../../../core/services/players.service';
import {ActivatedRoute} from '@angular/router';

export interface ISeries {
  name: string;
  data?: number[];
  color?: string;
}

Highcharts.setOptions({
  title: {
    style: {
      color: '#3f51b5'
    }
  }
});

@Component({
  selector: 'hota-profile-dashboard-chart',
  templateUrl: './profile-dashboard-chart.component.html',
  styleUrls: ['./profile-dashboard-chart.component.scss']
})
export class ProfileDashboardChartComponent implements OnChanges, OnInit {
  @Input()
  public dateRange: {start: Date, end: Date};
  public timeStamps: string[] = [];
  id: string;
  constructor(
    private playersService: PlayersService,
    private route: ActivatedRoute,
  ) { }

  public playerStatsData: number[] = [];
  public updateChartFlag = false;
  public currentChartType = 'line';
  public chartData: ISeries[] = [
    {
      name: 'Rating',
      data: this.playerStatsData,
      color: '#3f51b5'
    }
  ];

  Highcharts: typeof Highcharts = Highcharts;
  public chartOptions;

  public formatDate(date): string{
    return date.split('T')[0];
  }

  public getTruncatedPlayerStats(playerData, statsName): void{
    let filteredData = playerData;

    if (this.dateRange.start != null)
    {
      filteredData = playerData.filter(data => data.time >= this.dateRange.start.toISOString());
    }

    if (this.dateRange.end != null)
    {
      filteredData.filter(data => data.time <= this.dateRange.end.toISOString());
    }

    console.log(statsName);
    switch (statsName) {
      case 'ratings':
        this.playerStatsData = filteredData.map((obj) => obj.rating);
        break;
      case 'reputations':
        this.playerStatsData = filteredData.map((obj) => obj.reputation);
        break;
      case 'hours':
        this.playerStatsData = filteredData.map((obj) => obj.played);
        break;
    }
    this.timeStamps = filteredData.map(({time}) => this.formatDate(time));
    this.Update();
  }

  public getPlayerStatistics(id, stats): void {
    this.playersService.getPlayerStatistics(id, stats)
      .subscribe((playerStats) => {
        this.getTruncatedPlayerStats(playerStats, stats);
      });
  }

  public setStatisticsMode({ target }): void {
    switch (target.textContent) {
      case 'Rating':
        this.chartData[0].name = 'Rating statistics';
        this.getPlayerStatistics(this.id, 'ratings');
        break;
      case 'Reputation':
        this.chartData[0].name = 'Rating statistics';
        this.getPlayerStatistics(this.id, 'reputations');
        break;
      case 'Hours':
        this.chartData[0].name = 'Rating statistics';
        this.getPlayerStatistics(this.id, 'hours');
        break;
    }
    this.updateChartFlag = true;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.chartData[0].name = 'Rating statistics';
    this.getPlayerStatistics(this.id, 'ratings');
    this.Update();
  }

  private Update(): void {
    this.chartData.map((val) => (val.data = this.playerStatsData));
    this.chartOptions = {
      title: {text: 'Player statistics'},
      chart: {
        type: this.currentChartType
      },
      xAxis: {
        type: 'datetime',
        categories: this.timeStamps
      },
      yAxis: {
        min: 0,
        title: {
          text: 'value'
        }
      },
      series: this.chartData
    };

    this.updateChartFlag = true;
  }
  ngOnChanges(): void {
    this.Update();
  }
}
