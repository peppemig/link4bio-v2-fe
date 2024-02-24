import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { DetailsComponent } from './details/details.component';
import { StatsComponent } from './stats/stats.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [],
    children: [
      { path: 'create', component: CreateComponent },
      { path: 'details', component: DetailsComponent },
      { path: 'stats', component: StatsComponent },
      { path: '', pathMatch: 'full', redirectTo: 'details' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
