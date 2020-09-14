import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import { flatMap, map} from 'rxjs/operators';

import { PlayerRepository } from '../../../core/repositories/player.repository';
import { PlayerModel } from '../../../core/models/player.model';
import { PlayerWebEntity } from './player-web-entity';
import { PlayerWebRepositoryMapper } from './player-web-repository-mapper';
import { environment } from '../../../../environments/environment';
import { PlayersResponseModel } from '../../../core/models/players-response.model';
import { PlayersResponseWebEntity } from './players-response-web-entity';
import {PlayersResponseWebRepositoryMapper} from './players-response-web-repository-mapper';

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

  getPlayersWithPagination(pagParams: HttpParams = new HttpParams()): Observable<PlayersResponseModel> {
    return this.http
      .get<PlayersResponseWebEntity>(`${environment.api_url}/players/`, {observe: 'response', params: pagParams})
      .pipe(map(this.playersResponseMapper.mapFrom));
  }
}
