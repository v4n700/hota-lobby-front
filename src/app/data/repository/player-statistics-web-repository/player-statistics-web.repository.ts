import {Injectable} from '@angular/core';
import {PlayerStatisticsRepository} from '../../../core/repositories/player-statistics.repository';
import {PlayerStatisticsRatingModel} from '../../../core/models/player-statistics-rating.model';
import {Observable} from 'rxjs';
import {PlayerStatisticsRatingWebMapper} from './player-statistics-rating-web-mapper';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {flatMap, map} from 'rxjs/operators';
import {PlayerStatisticsRatingWebEntity} from './player-statistics-rating-web-entity';

@Injectable({
  providedIn: 'root'
})
export class PlayerStatisticsWebRepository extends PlayerStatisticsRepository {

  playerRatingStatsMapper = new PlayerStatisticsRatingWebMapper();

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
}
