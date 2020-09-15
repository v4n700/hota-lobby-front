import {Injectable} from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PlayerStatisticsRepository } from '../../../core/repositories/player-statistics.repository';
import { PlayerStatisticsRatingModel } from '../../../core/models/player-statistics-rating.model';
import { PlayerStatisticsRatingWebMapper } from './player-statistics-rating-web-mapper';
import { environment } from '../../../../environments/environment';
import { PlayerStatisticsRatingWebEntity } from './player-statistics-rating-web-entity';
import { PlayerStatisticsHoursModel } from '../../../core/models/player-statistics-hours.model';
import { PlayerStatisticsHoursWebEntity } from './player-statistics-hours-web-entity';
import { PlayerStatisticsHoursWebMapper } from './player-statistics-hours-web-mapper';
import { PlayerStatisticsReputationModel } from '../../../core/models/player-statistics-reputation.model';
import { PlayerStatisticsReputationWebMapper } from './player-statistics-reputation-web-mapper';
import { PlayerStatisticsReputationWebEntity } from './player-statistics-reputation-web-entity';

@Injectable({
  providedIn: 'root'
})
export class PlayerStatisticsWebRepository extends PlayerStatisticsRepository {

  playerRatingStatsMapper = new PlayerStatisticsRatingWebMapper();
  playerHoursStatsMapper = new PlayerStatisticsHoursWebMapper();
  playerReputationStatsMapper = new PlayerStatisticsReputationWebMapper();

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  getPlayerRatingStats(id: number): Observable<PlayerStatisticsRatingModel[]> {
    return this.http
      .get<PlayerStatisticsRatingWebEntity[]>(`${environment.api_url}/players/${id}/ratings`)
      .pipe(map(this.playerRatingStatsMapper.mapFrom));
  }

  getPlayerHoursStats(id: number): Observable<PlayerStatisticsHoursModel[]> {
    return this.http
      .get<PlayerStatisticsHoursWebEntity[]>(`${environment.api_url}/players/${id}/hours`)
      .pipe(map(this.playerHoursStatsMapper.mapFrom));
  }

  getPlayerReputationStats(id: number): Observable<PlayerStatisticsReputationModel[]> {
    return this.http
      .get<PlayerStatisticsReputationWebEntity[]>(`${environment.api_url}/players/${id}/reputations`)
      .pipe(map(this.playerReputationStatsMapper.mapFrom));
  }
}
