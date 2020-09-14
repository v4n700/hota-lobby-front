import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { PlayerRepository } from '../../../core/repositories/player.repository';
import { PlayerModel } from '../../../core/models/player.model';
import { PlayerWebEntity } from './player-web-entity';
import { PlayerWebRepositoryMapper } from './player-web-repository-mapper';
import { environment } from '../../../../environments/environment';
import { PlayersResponseModel } from '../../../core/models/players-response.model';
import { PlayersResponseWebRepositoryMapper } from './players-response-web-repository-mapper';
import { PaginationParams } from '../../../core/models/pagintation-params.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerWebRepository extends PlayerRepository {

  playerMapper = new PlayerWebRepositoryMapper();
  playersResponseMapper = new PlayersResponseWebRepositoryMapper();

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  getPlayerById(id: number): Observable<PlayerModel> {
    return this.http
      .get<PlayerWebEntity>(`${environment.api_url}/players/${id}`)
      .pipe(map(this.playerMapper.mapFrom));
  }

  getPlayersWithPagination(params: PaginationParams): Observable<PlayersResponseModel> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('offset', params.offset.toString());
    httpParams = httpParams.set('limit', params.limit.toString());

    return this.http
      .get<PlayerWebEntity[]>(`${environment.api_url}/players`, {observe: 'response', params: httpParams})
      .pipe(map(this.playersResponseMapper.mapFrom));
  }
}
