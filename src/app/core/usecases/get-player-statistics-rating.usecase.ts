import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UseCase } from '../base/use-case';
import { PlayerStatisticsRepository } from '../repositories/player-statistics.repository';
import {PlayerStatisticsRatingModel} from '../models/player-statistics-rating.model';

@Injectable({
  providedIn: 'root'
})
export class GetPlayerStatisticsRatingUsecase implements UseCase<number, PlayerStatisticsRatingModel[]> {

  constructor(private playerStatisticsRepository: PlayerStatisticsRepository) {}

execute(params: number): Observable<PlayerStatisticsRatingModel[]> {
  return this.playerStatisticsRepository.getPlayerRatingStats(params);
}
}
