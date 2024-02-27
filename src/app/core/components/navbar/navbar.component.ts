import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/routes/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentRoute: string = '';
  user$: Observable<User | null> = of(null);

  constructor(private router: Router, private authSvc: AuthService) {}

  ngOnInit(): void {
    this.user$ = this.authSvc.userState$;
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.currentRoute = e.url;
      }
    });
  }

  logOut(): void {
    this.authSvc
      .logOut()
      .then(() => this.router.navigate(['']))
      .catch(() => console.error('ERROR LOGGING OUT'));
  }
}
