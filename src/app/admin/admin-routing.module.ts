import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './components/post/post.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewCitizenComponent } from './components/view-citizen/view-citizen.component';
import { CandidateComponent } from './components/candidate/candidate.component';
import { ViewWinnersComponent } from './components/view-winners/view-winners.component';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: '', redirectTo: 'citizen', pathMatch: 'full' },
      { path: 'citizen', component: ViewCitizenComponent },
      { path: 'post', component: PostComponent },
      { path: 'candidate', component: CandidateComponent },
      { path: 'winners', component: ViewWinnersComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
