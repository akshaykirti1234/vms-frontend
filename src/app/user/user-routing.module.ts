import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CastVoteComponent } from './components/cast-vote/cast-vote.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: '', redirectTo: 'cast-vote', pathMatch: 'full' },
      { path: 'cast-vote', component: CastVoteComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
