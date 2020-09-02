import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  PlayersService
} from './services/players.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    PlayersService
  ],
  declarations: []
})
export class CoreModule { }
