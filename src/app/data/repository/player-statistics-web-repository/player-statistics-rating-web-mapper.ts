import { Mapper } from '../../../core/base/mapper';
import { PlayerStatisticsRatingWebEntity } from './player-statistics-rating-web-entity';
import { PlayerStatisticsRatingModel } from '../../../core/models/player-statistics-rating.model';

export class PlayerStatisticsRatingWebMapper implements Mapper<PlayerStatisticsRatingWebEntity[], PlayerStatisticsRatingModel[]>{
  mapFrom(param: PlayerStatisticsRatingWebEntity[]): PlayerStatisticsRatingModel[] {
    return param.map(item => ({ rating: item.rating, time: new Date(item.time) }) as PlayerStatisticsRatingModel);
  }

  mapTo(param: PlayerStatisticsRatingModel[]): PlayerStatisticsRatingWebEntity[] {
    return undefined;
  }
}
