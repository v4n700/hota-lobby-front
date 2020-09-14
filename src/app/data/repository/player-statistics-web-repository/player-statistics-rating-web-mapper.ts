import { Mapper } from '../../../core/base/mapper';
import { PlayerStatisticsRatingWebEntity } from './player-statistics-rating-web-entity';
import { PlayerStatisticsRatingModel } from '../../../core/models/player-statistics-rating.model';

export class PlayerStatisticsRatingWebMapper implements Mapper<PlayerStatisticsRatingWebEntity, PlayerStatisticsRatingModel>{
  mapFrom(param: PlayerStatisticsRatingWebEntity): PlayerStatisticsRatingModel {
    return {
      rating: param.rating,
      time: param.time
    };
  }

  mapTo(param: PlayerStatisticsRatingModel): PlayerStatisticsRatingWebEntity {
    return undefined;
  }
}
