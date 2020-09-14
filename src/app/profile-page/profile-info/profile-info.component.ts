import { Component, OnInit } from '@angular/core';
import { PlayerModel } from '../../core/models/player.model';
import { ActivatedRoute } from '@angular/router';
import { GetPlayerByIdUsecase } from '../../core/usecases/get-player-by-id.usecase';

@Component({
  selector: 'hota-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  id: number;
  player: PlayerModel;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private getPlayerById: GetPlayerByIdUsecase
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getPlayerProfileData(this.id);
  }

  getPlayerProfileData(id): void {
    this.getPlayerById.execute(this.id).subscribe((playerData: PlayerModel) => {
      this.player = playerData;
      this.loading = false;
    });
  }

}
