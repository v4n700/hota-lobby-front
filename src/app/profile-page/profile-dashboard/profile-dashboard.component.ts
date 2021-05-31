import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'hota-profile-dashboard',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.scss'],
})
export class ProfileDashboardComponent {
  public chartsAmount = 1;
  public gridColumns = 1;

  charShouldResize: Subject<void> = new Subject<void>();

  dateIntervalFormGroup = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null),
  });

  public setChartsAmount(amount: number): void {
    this.chartsAmount = amount;
    this.gridColumns = this.chartsAmount >= 2 ? 2 : 1;
    this.charShouldResize.next();
  }
}
