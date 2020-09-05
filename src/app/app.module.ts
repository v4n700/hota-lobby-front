import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { HighchartsChartModule } from 'highcharts-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './material/material.module';
import { SidenavListComponent } from './shared/layout/sidenav-list/sidenav-list.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { ProfileModule } from './profile-page/profile.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeaderboardComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ProfileModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
