import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Player } from '../models/player.model';


@Injectable()
export class PlayersService extends ApiService{
  constructor(public http: HttpClient) {
    super (http);
  }

  getPlayers(offset, limit): Observable<any> {
    let params = new HttpParams();
    params = params.set('offset', offset);
    params = params.set('limit', limit);
    return this.getFullResponse('/players', params);
  }

  getPlayer(id): Observable<Player> {
    return this.get('/players/' + id);
  }

  getPlayerStatistics(id, stats): Observable<any> {
    return this.get('/players/' + id + '/' + stats);
  }
}
