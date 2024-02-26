import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AlreadyLoggedInGuard } from './guards/already-logged-in.guard';
const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['/auth/login']);

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'homepage' },
  {
    path: 'homepage',
    loadChildren: () =>
      import('./routes/homepage/homepage.module').then((m) => m.HomepageModule),
  },
  {
    path: 'auth',
    canActivate: [AlreadyLoggedInGuard],
    loadChildren: () =>
      import('./routes/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
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
