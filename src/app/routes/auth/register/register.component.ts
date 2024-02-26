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

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private authSvc: AuthService, private router: Router) {}

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

  ngOnInit(): void {}

  register(): void {
    if (this.registerForm.invalid) return;
    const { name, surname, email, password } = this.registerForm.value;
    this.authSvc
      .registerWithEmailPassword(email!, password!, name!, surname!)
      .then(() => this.router.navigate(['/auth/login']));
  }

  matchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirm');

    return password?.value === confirmPassword?.value
      ? null
      : { notmatched: true };
  }
}
