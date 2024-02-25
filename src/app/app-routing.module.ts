import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'homepage' },
  {
    path: 'homepage',
    loadChildren: () =>
      import('./routes/homepage/homepage.module').then((m) => m.HomepageModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./routes/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./routes/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'link',
    loadChildren: () =>
      import('./routes/link/link.module').then((m) => m.LinkModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
