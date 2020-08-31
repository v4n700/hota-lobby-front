import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';


@Injectable()
export class LeaderboardService extends ApiService{
  constructor(public http: HttpClient) {
    super (http);
  }

  getPlayers(offset, limit): Observable<any> {
    let params = new HttpParams();
    params = params.set('offset', offset);
    params = params.set('limit', limit);
    return this.get('/players', params);
  }
}
