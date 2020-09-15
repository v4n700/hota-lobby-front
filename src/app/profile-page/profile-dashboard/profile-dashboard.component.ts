import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'hota-profile-dashboard',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.scss']
})
export class ProfileDashboardComponent {

  constructor() {}
  public chartsAmount = 2;
  public gridColumns = 2;

  dateIntervalFormGroup = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null)
  });

  public setChartsAmount(amount: number): void {
    this.chartsAmount = amount;
    this.gridColumns = this.chartsAmount >= 2 ? 2 : 1;
  }

}
