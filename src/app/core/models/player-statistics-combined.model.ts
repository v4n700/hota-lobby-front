import {PlayerStatisticsRatingModel} from './player-statistics-rating.model';
import {PlayerStatisticsHoursModel} from './player-statistics-hours.model';
import {PlayerStatisticsReputationModel} from './player-statistics-reputation.model';

export interface PlayerStatisticsCombinedModel {
  rating: PlayerStatisticsRatingModel[];
  hours: PlayerStatisticsHoursModel[];
  reputation: PlayerStatisticsReputationModel[];
}
