import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UseCase } from '../base/use-case';
import { PlayerStatisticsRepository } from '../repositories/player-statistics.repository';
import { PlayerStatisticsHoursModel } from '../models/player-statistics-hours.model';

@Injectable({
  providedIn: 'root'
})
export class GetPlayerStatisticsHoursUsecase implements UseCase<number, PlayerStatisticsHoursModel[]> {

  constructor(private playerStatisticsRepository: PlayerStatisticsRepository) {}

execute(params: number): Observable<PlayerStatisticsHoursModel[]> {
  return this.playerStatisticsRepository.getPlayerHoursStats(params);
}
}
