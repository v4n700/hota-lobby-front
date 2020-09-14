import { Observable } from 'rxjs';
import { PlayerStatisticsRatingModel } from '../models/player-statistics-rating.model';

export abstract class PlayerStatisticsRepository {
  abstract getPlayerRatingStats(id: number): Observable<PlayerStatisticsRatingModel[]>;
}
