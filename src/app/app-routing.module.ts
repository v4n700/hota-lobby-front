import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaderboardComponent} from './leaderboard/leaderboard.component';
import { PlayerProfileComponent } from './player-profile/player-profile.component';

const routes: Routes = [
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: '', redirectTo: '/leaderboard', pathMatch: 'full'},
  { path: 'player/:id', component: PlayerProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
