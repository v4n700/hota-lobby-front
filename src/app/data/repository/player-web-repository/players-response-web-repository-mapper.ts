import { Mapper } from '../../../core/base/mapper';
import { PlayersResponseWebEntity } from './players-response-web-entity';
import { PlayersResponseModel } from '../../../core/models/players-response.model';
import {flatMap} from 'rxjs/operators';

export class PlayersResponseWebRepositoryMapper implements Mapper<PlayersResponseWebEntity, PlayersResponseModel>{
  mapFrom(param: PlayersResponseWebEntity): PlayersResponseModel {
    return {
      totalCount: Number(param.headers.get('X-Total-Count')),
      players: param.body
    };
  }

  mapTo(param: PlayersResponseModel): PlayersResponseWebEntity {
    return undefined;
  }
}
