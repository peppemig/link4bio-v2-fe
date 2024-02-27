import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Page } from 'src/app/shared/models/page.model';
import { AvatarUploadDialogComponent } from '../avatar-upload-dialog/avatar-upload-dialog.component';

@Component({
  selector: 'app-user-details-form',
  templateUrl: './user-details-form.component.html',
  styleUrls: ['./user-details-form.component.scss'],
})
export class UserDetailsFormComponent implements OnInit, OnChanges {
  @Input() pageData: Page | undefined;

  userInfosForm = new FormGroup({
    displayName: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    bio: new FormControl('', [Validators.required]),
  });

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pageData'] && changes['pageData'].currentValue) {
      this.userInfosForm.setValue({
        displayName: this.pageData?.user.displayName!,
        location: this.pageData?.user.location!,
        bio: this.pageData?.user.bio!,
      });
    }
  }

  openAvatarUploadDialog() {
    this.dialog.open(AvatarUploadDialogComponent);
  }
}
