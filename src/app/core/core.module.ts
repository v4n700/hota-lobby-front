import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  PlayersService
} from './services/players.service';
import {ApiService} from './services/api.service';
import {PlayerRepository} from './repositories/player.repository';
import {PlayerWebRepository} from '../data/repository/player-web-repository/player-web.repository';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ApiService,
    PlayersService,
    {provide: PlayerRepository, useClass: PlayerWebRepository}
  ],
  declarations: []
})
export class CoreModule { }
