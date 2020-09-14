import {PlayerWebEntity} from './player-web-entity';
import {HttpEventType, HttpHeaders, HttpResponse} from '@angular/common/http';

export class PlayersResponseWebEntity {
  headers: HttpHeaders;
  body: PlayerWebEntity[];
  type: HttpEventType;
  status: number;
  statusText: string;
  url: string;
  ok: boolean;
  clone: HttpResponse<any>;
}
