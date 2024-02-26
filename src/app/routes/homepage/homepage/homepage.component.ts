import { Component, OnInit } from '@angular/core';
import { HomepageService } from '../services/homepage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  constructor(
    private homepageSvc: HomepageService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  uriForm = new FormGroup({
    uri: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  ngOnInit(): void {}

  checkIfUriExists() {
    if (this.uriForm.invalid) return;
    const { uri } = this.uriForm.value;
    if (uri) {
      this.homepageSvc.checkIfUriExists(uri).subscribe((exists) => {
        if (exists) {
          this.snackBar.open(
            'Questo username è già stato utilizzato',
            'Chiudi'
          );
        } else {
          localStorage.setItem('desiredUri', uri);
          this.router.navigateByUrl('/auth/register');
        }
      });
    }
  }
}
