import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {MatDateRangePickerInput} from '@angular/material/datepicker/date-range-picker';

@Component({
  selector: 'hota-profile-dashboard',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.scss']
})
export class ProfileDashboardComponent {
  public chartsAmount = 1;

  dateIntervalFormGroup = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null)
  });

  constructor() {}

}
