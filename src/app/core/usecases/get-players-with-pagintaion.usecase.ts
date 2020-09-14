import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UseCase } from '../base/use-case';
import { PlayerRepository } from '../repositories/player.repository';
import { PlayersResponseModel } from '../models/players-response.model';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetPlayersWithPagintaionUsecase implements UseCase<HttpParams, PlayersResponseModel> {

  constructor(private playerRepository: PlayerRepository) {}

  execute(params: HttpParams): Observable<PlayersResponseModel> {
    return this.playerRepository.getPlayersWithPagination(params);
  }
}
