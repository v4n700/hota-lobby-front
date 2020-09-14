import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UseCase } from '../base/use-case';
import { PlayerStatisticsRepository } from '../repositories/player-statistics.repository';
import {PlayerStatisticsReputationModel} from '../models/player-statistics-reputation.model';

@Injectable({
  providedIn: 'root'
})
export class GetPlayerStatisticsReputationUsecase implements UseCase<number, PlayerStatisticsReputationModel[]> {

  constructor(private playerStatisticsRepository: PlayerStatisticsRepository) {}

execute(params: number): Observable<PlayerStatisticsReputationModel[]> {
  return this.playerStatisticsRepository.getPlayerReputationStats(params);
}
}
