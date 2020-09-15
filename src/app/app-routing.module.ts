import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaderboardComponent} from './leaderboard/leaderboard.component';
import { ProfileComponent } from './profile-page/profile.component';

const routes: Routes = [
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: '', redirectTo: '/leaderboard', pathMatch: 'full'},
  { path: 'player/:id', component: ProfileComponent},
  { path: '**', redirectTo: '/leaderboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
