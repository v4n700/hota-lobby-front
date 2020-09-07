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

  public getTruncatedPlayerStats(playerData): void{
    const filteredData = playerData
      .filter(data => data.time >= this.dateRange.start.toISOString() && data.time <= this.dateRange.end.toISOString());
    this.playerStatsData = filteredData.map(({rating}) => rating);
    this.timeStamps = filteredData.map(({time}) => this.formatDate(time));
  }

  public getPlayerStatistics(id, stats): void {
    this.playersService.getPlayerStatistics(id, stats)
      .subscribe((playerStats) => {
        this.getTruncatedPlayerStats(playerStats);
      });
  }

  public setStatisticsMode({ target }): void {
    switch (target.textContent) {
      case 'Rating':
        this.chartData[0].name = 'Rating statistics';
        this.getPlayerStatistics(this.id, 'ratings');
        break;
    }
    console.log('hui');
    this.updateChartFlag = true;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
  }

  ngOnChanges(): void {
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

}
