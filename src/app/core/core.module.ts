import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {PlayerRepository} from './repositories/player.repository';
import {PlayerWebRepository} from '../data/repository/player-web-repository/player-web.repository';
import {PlayerStatisticsRepository} from './repositories/player-statistics.repository';
import {PlayerStatisticsWebRepository} from '../data/repository/player-statistics-web-repository/player-statistics-web.repository';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    {provide: PlayerRepository, useClass: PlayerWebRepository},
    {provide: PlayerStatisticsRepository, useClass: PlayerStatisticsWebRepository}
  ],
  declarations: []
})
export class CoreModule { }
