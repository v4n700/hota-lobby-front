import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { MaterialModule } from '../material/material.module';
import { ProfileDashboardComponent } from './profile-dashboard/profile-dashboard.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ProfileDashboardChartComponent } from './profile-dashboard/profile-dashboard-chart/profile-dashboard-chart.component';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HighchartsChartModule,
    FlexModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  declarations: [
    ProfileComponent,
    ProfileInfoComponent,
    ProfileDashboardComponent,
    ProfileDashboardChartComponent
  ],
  providers: []
})
export class ProfileModule {}
