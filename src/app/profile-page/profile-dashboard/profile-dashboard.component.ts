import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'hota-profile-dashboard',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.scss']
})
export class ProfileDashboardComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = {
    series: [{
      data: [1, 2, 3],
      type: 'line'
    }]
  }; // required
  updateFlag = false; // optional boolean
  oneToOneFlag = true; // optional boolean, defaults to false
  runOutsideAngular = false; // optional boolean, defaults to false

  constructor() { }

  ngOnInit(): void {
  }

}
