import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingHandler } from 'src/app/shared/handlers/loading-handler';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  loadingRegister = new LoadingHandler();
  registerForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
      ]),
      confirm: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
      ]),
    },
    {
      validators: this.matchValidator,
    }
  );

  constructor(private authSvc: AuthService, private router: Router) {}

  ngOnInit(): void {}

  register(): void {
    if (this.registerForm.invalid) return;
    this.loadingRegister.start();
    const { name, surname, email, password } = this.registerForm.value;
    this.authSvc
      .registerWithEmailPassword(email!, password!, name!, surname!)
      .then(() => {
        this.loadingRegister.stop();
        this.router.navigate(['/profile/details']);
      })
      .catch(() => {
        this.loadingRegister.stop();
        console.error('Register error, try again');
      });
  }

  registerWithGoogle(): void {
    this.loadingRegister.start();
    this.authSvc
      .signInWithGoogle()
      .then(() => {
        this.loadingRegister.stop();
        this.router.navigate(['/profile/details']);
      })
      .catch(() => {
        this.loadingRegister.stop();
        console.log('Google register error, try again');
      });
  }

  matchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirm');

    return password?.value === confirmPassword?.value
      ? null
      : { notmatched: true };
  }
}
