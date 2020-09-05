import { Component, OnInit } from '@angular/core';
import { Player } from '../../core/models/player.model';
import { ActivatedRoute } from '@angular/router';
import { PlayersService } from '../../core/services/players.service';

@Component({
  selector: 'hota-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
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
