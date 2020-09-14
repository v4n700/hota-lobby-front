import { Injectable } from '@angular/core';
import {forkJoin, Observable} from 'rxjs';

import { UseCase } from '../base/use-case';
import { PlayerStatisticsRepository } from '../repositories/player-statistics.repository';
import {PlayerStatisticsCombinedModel} from '../models/player-statistics-combined.model';

@Injectable({
  providedIn: 'root'
})
export class GetPlayerStatisticsHoursUsecase implements UseCase<number, PlayerStatisticsCombinedModel> {

  constructor(private playerStatisticsRepository: PlayerStatisticsRepository) {}

execute(params: number): Observable<PlayerStatisticsCombinedModel> {
  return forkJoin({
    rating: this.playerStatisticsRepository.getPlayerRatingStats(params),
    hours: this.playerStatisticsRepository.getPlayerHoursStats(params),
    reputation: this.playerStatisticsRepository.getPlayerReputationStats(params)
  });
}
}
