import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ViewCitizenComponent } from './components/view-citizen/view-citizen.component';
import { PostComponent } from './components/post/post.component';
import { CandidateComponent } from './components/candidate/candidate.component';
import { ViewWinnersComponent } from './components/view-winners/view-winners.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ViewCitizenComponent,
    PostComponent,
    CandidateComponent,
    ViewWinnersComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
