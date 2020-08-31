import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LeaderboardService
} from './services/leaderboard.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    LeaderboardService
  ],
  declarations: []
})
export class CoreModule { }
