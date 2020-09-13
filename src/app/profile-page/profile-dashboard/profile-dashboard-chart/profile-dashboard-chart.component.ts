import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import {ActivatedRoute} from '@angular/router';

import {PlayersService} from '../../../core/services/players.service';
import {forkJoin} from 'rxjs';
import { Series } from '../../../core/models/series.model';

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

  id: string;
  public rawPlayerData = [];
  public playerStatsData: number[] = [];
  public timeStamps: string[] = [];

  constructor(
    private playersService: PlayersService,
    private route: ActivatedRoute,
  ) { }

  public updateChartFlag = false;
  public currentChartType = 'line';
  public chartData: Series[] = [
    {
      name: 'Rating',
      data: this.playerStatsData,
      color: '#3f51b5'
    }
  ];

  Highcharts: typeof Highcharts = Highcharts;
  public chartOptions;

  public switchSeriesDisplayMode(type: string): void {
    if (this.currentChartType !== type)
    {
      this.currentChartType = type;
      this.chartOptions.chart.type = type;
    }

    this.updateChartFlag = true;
  }

  public switchSeriesColor({ target }): void {
    if (target.textContent === 'Primary')
    {
      this.chartOptions.series.map((data: Series) => (data.color = '#3f51b5'));
    } else {
      this.chartOptions.series.map((data: Series) => (data.color = target.textContent));
    }

    this.updateChartFlag = true;
  }

  public formatDate(date): string{
    return date.split('T')[0];
  }

  public getCleanChartData(playerData, statsName): number[]{
    let filteredData = playerData;

    if (this.dateRange.start != null)
    {
      filteredData = playerData.filter(data => data.time >= this.dateRange.start.toISOString());
    }

    if (this.dateRange.end != null)
    {
      const dateEnd = new Date(this.dateRange.end);
      dateEnd.setDate(this.dateRange.end.getDate() + 1);

      filteredData = filteredData.filter(data => data.time <= dateEnd.toISOString());
    }

    this.timeStamps = filteredData.map(({time}) => this.formatDate(time));

    switch (statsName) {
      case 'ratings':
        return filteredData.map((obj) => obj.rating);
      case 'reputations':
        return filteredData.map((obj) => obj.reputation);
      case 'hours':
        return filteredData.map((obj) => obj.played);
    }
  }

  public getPlayerStatistics(id, stats): any {
    this.playersService.getPlayerStatistics(id, stats)
      .subscribe((playerStats) => {
        this.rawPlayerData = playerStats;
        this.playerStatsData = this.getCleanChartData(this.rawPlayerData, stats);
        this.Update();
      });
  }

  public setStatisticsMode({ target }): void {
    switch (target.textContent) {
      case 'Rating':
        this.clearChartData();
        this.chartData[0].name = 'Rating';
        this.getPlayerStatistics(this.id, 'ratings');
        break;
      case 'Reputation':
        this.clearChartData();
        this.chartData[0].name = 'Reputation';
        this.getPlayerStatistics(this.id, 'reputations');
        break;
      case 'Hours':
        this.clearChartData();
        this.chartData[0].name = 'Hours';
        this.getPlayerStatistics(this.id, 'hours');
        break;
      case 'Combined':
        this.getCombinedStatistics();
        break;
    }
    this.updateChartFlag = true;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.chartData[0].name = 'Rating';
    this.getPlayerStatistics(this.id, 'ratings');
  }

  private Update(): void {
    this.chartData.map((value) => (value.data = this.playerStatsData));
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
    this.playerStatsData = this.getCleanChartData(this.rawPlayerData, 'ratings');
    this.Update();
  }

  public getCombinedStatistics(): void {
    forkJoin({
      stats1: this.playersService.getPlayerStatistics(this.id, 'ratings'),
      stats2: this.playersService.getPlayerStatistics(this.id, 'reputations'),
      stats3: this.playersService.getPlayerStatistics(this.id, 'hours')
    }).subscribe( data => {
      this.combineStatistics(data);
    });
  }

  public clearChartData(): void {
    while (this.chartData.length > 1) {
      this.chartData.pop();
    }
  }

  public combineStatistics(data): void {
    this.chartData.length = 0;
    this.chartData.push(
      {
        name: 'Rating',
        data: this.getCleanChartData(data.stats1, 'ratings'),
        color: '#3f51b5'
      },
      {
        name: 'Reputation',
        data: this.getCleanChartData(data.stats2, 'reputations'),
        color: '#2e8c31'
      },
      {
        name: 'Hours',
        data: this.getCleanChartData(data.stats3, 'hours'),
        color: '#9c1446'
      });

    this.updateChartFlag = true;
  }
}
