import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription, of } from 'rxjs';
import { PageService } from 'src/app/shared/services/page.service';
import { User } from '@angular/fire/auth';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  constructor(
    private pageSvc: PageService,
    private router: Router,
    private snackBar: MatSnackBar,
    private authSvc: AuthService
  ) {}

  user$: Observable<User | null> = of(null);
  uriForm = new FormGroup({
    uri: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });
  subs: Subscription[] = [];

  ngOnInit(): void {
    this.user$ = this.authSvc.userState$;
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  checkIfUriExists() {
    if (this.uriForm.invalid) return;
    const { uri } = this.uriForm.value;
    if (uri) {
      this.subs.push(
        this.pageSvc.checkIfUriExists(uri).subscribe((exists) => {
          if (exists) {
            this.snackBar.open(
              'Questo username è già stato utilizzato',
              'Chiudi'
            );
          } else {
            localStorage.setItem('desiredUri', uri);
            this.router.navigateByUrl('/auth/register');
          }
        })
      );
    }
  }
}
