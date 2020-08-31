import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { LeaderboardService } from '../core/services/leaderboard.service';

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

  constructor(private leaderboardService: LeaderboardService) { }

  ngOnInit(): void {
    this.getData(0, 25);
  }

  getData(offset, limit): void {
    this.leaderboardService.getPlayers(offset, limit)
      .subscribe((data) => {
        this.loading = false;
        this.players = data.body;
        this.players.length = data.headers.get('X-Total-Count');
        this.dataSource = new MatTableDataSource<any>(this.players);
        this.dataSource.paginator = this.paginator;
      });
  }

  getNextData(currentOffset, limit): void {
    this.leaderboardService.getPlayers(currentOffset, limit)
      .subscribe((data) => {
        this.loading = false;

        this.players.length = currentOffset;
        this.players.push(...data.body);
        this.players.length = data.headers.get('X-Total-Count');

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

    this.getNextData(currentOffset, pageSize.toString());
  }
}
