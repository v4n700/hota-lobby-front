import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../core/services/players.service';
import {ActivatedRoute} from '@angular/router';
import { Player } from '../core/models/player.model';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'hota-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.scss']
})
export class PlayerProfileComponent implements OnInit {
  id: string;
  player: Player;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private playersService: PlayersService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getPlayerProfileData(this.id);
  }

  getPlayerProfileData(id): void {
    this.playersService.getPlayer(id)
      .subscribe((playerData: Player) => {
        this.player = playerData;
        this.loading = false;
    });
  }
}
