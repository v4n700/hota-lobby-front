import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { MaterialModule } from '../material/material.module';
import { ProfileDashboardComponent } from './profile-dashboard/profile-dashboard.component';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HighchartsChartModule
  ],
  declarations: [
    ProfileComponent,
    ProfileInfoComponent,
    ProfileDashboardComponent
  ],
  providers: []
})
export class ProfileModule {}
