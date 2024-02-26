import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthService } from '../routes/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AlreadyLoggedInGuard implements CanActivate {
  constructor(private router: Router, private authSvc: AuthService) {}

  canActivate() {
    return this.authSvc.userState$.pipe(
      take(1),
      map((user) => {
        if (user) {
          this.router.navigate(['/profile/details']);
          return false;
        }
        return true;
      })
    );
  }
}
