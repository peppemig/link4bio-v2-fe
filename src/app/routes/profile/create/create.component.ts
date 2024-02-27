import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageService } from 'src/app/shared/services/page.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit, OnDestroy {
  profileDetailsForm = new FormGroup({
    location: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    bio: new FormControl('', [Validators.required, Validators.minLength(2)]),
    uri: new FormControl(localStorage.getItem('desiredUri'), [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  subs: Subscription[] = [];

  constructor(
    private router: Router,
    private pageSvc: PageService,
    private userSvc: UserService
  ) {}

  ngOnInit(): void {
    this.subs.push(
      this.pageSvc.checkIfUserHasPage().subscribe((hasPage) => {
        if (hasPage) {
          this.router.navigate(['/profile/details']);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  saveUserDetails() {
    if (this.profileDetailsForm.invalid) return;
    const { location, bio, uri } = this.profileDetailsForm.value;
    if (location && bio && uri) {
      this.subs.push(
        this.userSvc
          .saveUserDetails({ location, bio, uri })
          .subscribe(() => this.router.navigate(['/profile/details']))
      );
    }
  }
}
