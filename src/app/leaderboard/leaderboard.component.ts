import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'hota-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  players: any[];
  loading = true;
  dataSource = new MatTableDataSource<any>();
  private url = 'https://hota-lobby-test-api.herokuapp.com/api/players?';
  title = 'Leaderboard';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getData('0', '25');
  }

  getData(offset, limit): void {
    let params = new HttpParams();
    params = params.set('offset', offset);
    params = params.set('limit', limit);

    this.http.get(this.url + params.toString())
      .subscribe((response: any) => {
        this.loading = false;
        this.players = response;
        this.dataSource = new MatTableDataSource<any>(this.players);
        this.dataSource.paginator = this.paginator;
        console.log(response.headers.get('X-Total-Count').toString());
      });
  }

  getNextData(currentSize, offset, limit): void {
    let params = new HttpParams();
    params = params.set('offset', offset);
    params = params.set('limit', limit);

    this.http.get(this.url + params.toString())
      .subscribe((response: any) => {

        this.loading = false;

        this.players.length = currentSize;
        this.players.push(...response);
        this.dataSource = new MatTableDataSource<any>(this.players);
        this.dataSource._updateChangeSubscription();

        this.dataSource.paginator = this.paginator;
      });
  }

  pageChanged(event): void {
    this.loading = true;

    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;

    const previousSize = pageSize * pageIndex;

    this.getNextData(previousSize, (pageIndex).toString(), pageSize.toString());
  }
}
