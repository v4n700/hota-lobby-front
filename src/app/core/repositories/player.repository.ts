import { Observable } from 'rxjs';
import { PlayerModel } from '../models/player.model';
import { PlayersResponseModel } from '../models/players-response.model';
import { PaginationParams } from '../models/pagintation-params.model';

export abstract class PlayerRepository {
  abstract getPlayerById(id: number): Observable<PlayerModel>;
  abstract getPlayersWithPagination(
    params: PaginationParams
  ): Observable<PlayersResponseModel>;
}
