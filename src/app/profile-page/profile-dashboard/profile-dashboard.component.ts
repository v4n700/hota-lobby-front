import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {MatDateRangePickerInput} from '@angular/material/datepicker/date-range-picker';

@Component({
  selector: 'hota-profile-dashboard',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.scss']
})
export class ProfileDashboardComponent {
  public chartsNumber = 1;
  public ratings = true;
  public reputations = false;
  public hours = false;
  public towers = false;

  currentDate = new Date();

  dateIntervalFormGroup = new FormGroup({
    start: new FormControl(this.currentDate),
    end: new FormControl(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, this.currentDate.getDate()))
  });

  constructor() {}

}
