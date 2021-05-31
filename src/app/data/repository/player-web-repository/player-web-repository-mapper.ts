import { Mapper } from '../../../core/base/mapper';
import { PlayerWebEntity } from './player-web-entity';
import { PlayerModel } from '../../../core/models/player.model';

export class PlayerWebRepositoryMapper
  implements Mapper<PlayerWebEntity, PlayerModel>
{
  mapFrom(param: PlayerWebEntity): PlayerModel {
    return {
      name: param.name,
      rating: param.rating,
      reputation: param.reputation,
      last_seen_at: param.last_seen_at,
      registered_at: param.registered_at,
    };
  }

  mapTo(param: PlayerModel): PlayerWebEntity {
    return undefined;
  }
}
