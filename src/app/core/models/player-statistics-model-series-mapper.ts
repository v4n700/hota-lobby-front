import { PlayerStatisticsRatingModel } from './player-statistics-rating.model';
import { SeriesModel } from './series.model';
import { PlayerStatisticsHoursModel } from './player-statistics-hours.model';
import { PlayerStatisticsReputationModel } from './player-statistics-reputation.model';

export class PlayerStatisticsModelSeriesMapper {
  mapFromRating(rating: PlayerStatisticsRatingModel[]): SeriesModel {
    return { data: rating.map(item => item.rating), timeStamps: rating.map(item => item.time) };
  }

  mapFromHours(hours: PlayerStatisticsHoursModel[]): SeriesModel {
    return { data: hours.map(item => item.hours), timeStamps: hours.map(item => item.time) };
  }

  mapFromReputation(reputation: PlayerStatisticsReputationModel[]): SeriesModel {
    return { data: reputation.map(item => item.reputation), timeStamps: reputation.map(item => item.time) };
  }
}
