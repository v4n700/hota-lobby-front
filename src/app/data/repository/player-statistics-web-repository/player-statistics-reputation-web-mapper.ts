import { Mapper } from '../../../core/base/mapper';
import {PlayerStatisticsReputationWebEntity} from './player-statistics-reputation-web-entity';
import {PlayerStatisticsReputationModel} from '../../../core/models/player-statistics-reputation.model';

export class PlayerStatisticsReputationWebMapper
  implements Mapper<PlayerStatisticsReputationWebEntity[], PlayerStatisticsReputationModel[]>{

  mapFrom(param: PlayerStatisticsReputationWebEntity[]): PlayerStatisticsReputationModel[] {
    return param.map(item => ({ reputation: item.reputation, time: new Date(item.time) }) as PlayerStatisticsReputationModel);
  }

  mapTo(param: PlayerStatisticsReputationModel[]): PlayerStatisticsReputationWebEntity[] {
    return undefined;
  }
}
