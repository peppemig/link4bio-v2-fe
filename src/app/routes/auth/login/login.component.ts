import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
    ]),
  });

  constructor(private authSvc: AuthService, private router: Router) {}

  ngOnInit(): void {}

  signInWithEmailPassword(): void {
    if (this.loginForm.invalid) return;
    const { email, password } = this.loginForm.value;
    this.authSvc
      .signInWithEmailPassword(email!, password!)
      .then(() => {
        this.router.navigate(['/profile/details']);
      })
      .catch(() => {
        console.log('ERRORE LOGIN EMAIL/PASSWORD');
      });
  }

  signInWithGoogle(): void {
    this.authSvc
      .signInWithGoogle()
      .then(() => {
        this.router.navigate(['/profile/details']);
      })
      .catch(() => {
        console.log('ERRORE LOGIN CON GOOGLE');
      });
  }
}
