import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UseCase } from '../base/use-case';
import { PlayerRepository } from '../repositories/player.repository';
import { PlayersResponseModel } from '../models/players-response.model';
import {PaginationParams} from '../models/pagintation-params.model';

@Injectable({
  providedIn: 'root'
})
export class GetPlayersWithPaginationUsecase implements UseCase<PaginationParams, PlayersResponseModel> {

  constructor(private playerRepository: PlayerRepository) {}

  execute(params: PaginationParams): Observable<PlayersResponseModel> {
    return this.playerRepository.getPlayersWithPagination(params);
  }
}
