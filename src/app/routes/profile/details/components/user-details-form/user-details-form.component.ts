import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Page } from 'src/app/shared/models/page.model';
import { AvatarUploadDialogComponent } from '../avatar-upload-dialog/avatar-upload-dialog.component';
import { UserService } from 'src/app/shared/services/user.service';
import { Subscription } from 'rxjs';
import { LoadingHandler } from 'src/app/shared/handlers/loading-handler';

@Component({
  selector: 'app-user-details-form',
  templateUrl: './user-details-form.component.html',
  styleUrls: ['./user-details-form.component.scss'],
})
export class UserDetailsFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() pageData: Page | undefined;
  @Output() detailsMutationEvent = new EventEmitter();
  loadingDetailsMutation = new LoadingHandler();

  subs: Subscription[] = [];

  userInfosForm = new FormGroup({
    displayName: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    bio: new FormControl('', [Validators.required]),
  });

  constructor(private dialog: MatDialog, private userSvc: UserService) {}

  ngOnInit(): void {
    this.userInfosForm.setValidators(this.sameValueValidator.bind(this));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pageData'] && changes['pageData'].currentValue) {
      this.userInfosForm.setValue({
        displayName: this.pageData?.user.displayName!,
        location: this.pageData?.user.location!,
        bio: this.pageData?.user.bio!,
      });
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  editUserInfos() {
    if (this.userInfosForm.invalid) return;
    this.loadingDetailsMutation.start();
    const { displayName, bio, location } = this.userInfosForm.value;
    this.subs.push(
      this.userSvc
        .updateUserInfos({
          displayName: displayName!,
          bio: bio!,
          location: location!,
        })
        .subscribe({
          next: () => {
            this.loadingDetailsMutation.stop();
            this.detailsMutationEvent.emit();
          },
          error: () => {
            this.loadingDetailsMutation.stop();
          },
        })
    );
  }

  openAvatarUploadDialog() {
    let dialogRef = this.dialog.open(AvatarUploadDialogComponent, {
      autoFocus: false,
      panelClass: 'dialog-responsive',
    });
    const sub = dialogRef.componentInstance.avatarMutationEvent.subscribe(
      () => {
        this.detailsMutationEvent.emit();
      }
    );
    dialogRef.afterClosed().subscribe(() => {});
  }

  sameValueValidator(control: AbstractControl): ValidationErrors | null {
    const currentDisplayName = control.get('displayName');
    const currentLocation = control.get('location');
    const currentBio = control.get('bio');
    const user = this.pageData?.user;
    return currentDisplayName?.value === user?.displayName &&
      currentLocation?.value === user?.location &&
      currentBio?.value === user?.bio
      ? { samevalue: true }
      : null;
  }
}
