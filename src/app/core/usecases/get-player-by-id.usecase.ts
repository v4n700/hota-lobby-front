import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UseCase } from '../base/use-case';
import { PlayerModel } from '../models/player.model';
import { PlayerRepository } from '../repositories/player.repository';

@Injectable({
  providedIn: 'root'
})
export class GetPlayerByIdUsecase implements UseCase<number, PlayerModel> {

  constructor(private playerRepository: PlayerRepository) {}

  execute(params: number): Observable<PlayerModel> {
    return this.playerRepository.getPlayerById(params);
  }
}

