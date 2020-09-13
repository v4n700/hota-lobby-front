import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Player } from '../models/player.model';


@Injectable()
export class PlayersService {
  constructor(private apiService: ApiService) {
  }

  getPlayers(offset, limit): Observable<any> {
    let params = new HttpParams();
    params = params.set('offset', offset);
    params = params.set('limit', limit);
    return this.apiService.getFullResponse(`/players`, params);
  }

  getPlayer(id): Observable<Player> {
    return this.apiService.get(`/players/${id}`);
  }

  getPlayerStatistics(id: string, stats): Observable<any> {
    return this.apiService.get(`/players/${id}/${stats}`);
  }
}
