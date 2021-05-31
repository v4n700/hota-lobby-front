import { HttpResponse } from '@angular/common/http';

import { Mapper } from '../../../core/base/mapper';
import { PlayersResponseModel } from '../../../core/models/players-response.model';
import { PlayerWebEntity } from './player-web-entity';

export class PlayersResponseWebRepositoryMapper
  implements Mapper<HttpResponse<PlayerWebEntity[]>, PlayersResponseModel>
{
  mapFrom(param: HttpResponse<PlayerWebEntity[]>): PlayersResponseModel {
    return {
      totalCount: Number(param.headers.get('X-Total-Count')),
      players: param.body,
    };
  }

  mapTo(param: PlayersResponseModel): HttpResponse<PlayerWebEntity[]> {
    return undefined;
  }
}
