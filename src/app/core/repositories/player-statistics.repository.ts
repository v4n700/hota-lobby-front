import { Observable } from 'rxjs';
import { PlayerStatisticsRatingModel } from '../models/player-statistics-rating.model';
import { PlayerStatisticsHoursModel } from '../models/player-statistics-hours.model';
import { PlayerStatisticsReputationModel } from '../models/player-statistics-reputation.model';

export abstract class PlayerStatisticsRepository {
  abstract getPlayerRatingStats(id: number): Observable<PlayerStatisticsRatingModel[]>;
  abstract getPlayerHoursStats(id: number): Observable<PlayerStatisticsHoursModel[]>;
  abstract getPlayerReputationStats(id: number): Observable<PlayerStatisticsReputationModel[]>;
}
