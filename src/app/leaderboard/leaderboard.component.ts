import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PlayerModel } from '../core/models/player.model';

import { GetPlayersWithPaginationUsecase } from '../core/usecases/get-players-with-paginataion.usecase';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'hota-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  players: any[];
  loading = true;
  dataSource = new MatTableDataSource<any>();
  title = 'Leaderboard';
  OFFSET = 0;
  LIMIT = 25;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private getPlayers: GetPlayersWithPaginationUsecase) {}

  ngOnInit(): void {
    this.players = [];
    this.getData(this.OFFSET, this.LIMIT);
  }

  getData(offset, limit): void {
    this.getPlayers
      .execute({
        offset,
        limit,
      })
      .pipe(
        tap((data) => {
          this.loading = false;

          this.players.length = offset;
          this.players.push(...data.players);
          this.players.length = data.totalCount;
          this.dataSource = new MatTableDataSource<PlayerModel[]>(this.players);
          this.dataSource._updateChangeSubscription();

          this.dataSource.paginator = this.paginator;
        }),
        take(1)
      )
      .subscribe();
  }

  pageChanged(event): void {
    this.loading = true;
    this.OFFSET = event.pageSize * event.pageIndex;
    this.LIMIT = event.pageSize;
    this.getData(this.OFFSET, this.LIMIT);
  }
}
