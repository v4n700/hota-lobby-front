import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { GetPlayersWithPaginationUsecase } from '../core/usecases/get-players-with-paginataion.usecase';

@Component({
  selector: 'hota-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  players: any[];
  loading = true;
  dataSource = new MatTableDataSource<any>();
  title = 'Leaderboard';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private getPlayers: GetPlayersWithPaginationUsecase ) { }

  ngOnInit(): void {
    this.players = [];
    this.getData(0, 25);
  }

  getData(offset, limit): void {
    this.getPlayers.execute({
      offset,
      limit
    }).subscribe((data) => {
      this.loading = false;

      this.players.length = offset;
      this.players.push(...data.players);
      this.players.length = data.totalCount;

      this.dataSource = new MatTableDataSource<any>(this.players);
      this.dataSource._updateChangeSubscription();

      this.dataSource.paginator = this.paginator;
    });
  }

  pageChanged(event): void {
    this.loading = true;

    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;

    const currentOffset = pageSize * pageIndex;

    this.getData(currentOffset, pageSize);
  }
}
