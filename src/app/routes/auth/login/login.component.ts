import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoadingHandler } from 'src/app/shared/handlers/loading-handler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loadingLogin = new LoadingHandler();
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
    this.loadingLogin.start();
    const { email, password } = this.loginForm.value;
    this.authSvc
      .signInWithEmailPassword(email!, password!)
      .then(() => {
        this.loadingLogin.stop();
        this.router.navigate(['/profile/details']);
      })
      .catch(() => {
        this.loadingLogin.stop();
        console.log('Login error, try again');
      });
  }

  signInWithGoogle(): void {
    this.loadingLogin.start();
    this.authSvc
      .signInWithGoogle()
      .then(() => {
        this.loadingLogin.stop();
        this.router.navigate(['/profile/details']);
      })
      .catch(() => {
        this.loadingLogin.stop();
        console.error('Google Login error, try again');
      });
  }
}
