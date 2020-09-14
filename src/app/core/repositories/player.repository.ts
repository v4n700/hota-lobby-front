import { Observable } from 'rxjs';
import { PlayerModel } from '../models/player.model';
import { PlayersResponseModel } from '../models/players-response.model';
import { HttpParams } from '@angular/common/http';

export abstract class PlayerRepository {
  abstract getPlayerById(id: number): Observable<PlayerModel>;
  abstract getPlayersWithPagination(params: HttpParams): Observable<PlayersResponseModel>;
}
