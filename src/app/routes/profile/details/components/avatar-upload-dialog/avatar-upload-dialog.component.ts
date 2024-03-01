import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LoadingHandler } from 'src/app/shared/handlers/loading-handler';
import { AvatarUploadService } from 'src/app/shared/services/avatar-upload.service';

@Component({
  selector: 'app-avatar-upload-dialog',
  templateUrl: './avatar-upload-dialog.component.html',
  styleUrls: ['./avatar-upload-dialog.component.scss'],
})
export class AvatarUploadDialogComponent implements OnInit {
  @Output() avatarMutationEvent = new EventEmitter();
  loadingAvatarMutation = new LoadingHandler();

  avatarImage: File | null = null;
  avatarImageMin: any = null;

  constructor(
    private avatarUploadSvc: AvatarUploadService,
    private dialogRef: MatDialogRef<AvatarUploadDialogComponent>
  ) {}

  ngOnInit(): void {}

  uploadAvatar() {
    this.dialogRef.disableClose = true;
    this.loadingAvatarMutation.start();
    this.avatarUploadSvc.uploadAvatar(this.avatarImage!).subscribe({
      next: () => {
        this.avatarMutationEvent.emit();
        this.dialogRef.close();
        this.loadingAvatarMutation.stop();
      },
      error: () => {
        this.dialogRef.disableClose = false;
        this.loadingAvatarMutation.stop();
      },
    });
  }

  onSelectedFileChange(event: any) {
    this.avatarImage = event.target.files[0];
    this.avatarImageMin = null;
    const fr = new FileReader();
    fr.onload = (ev) => {
      this.avatarImageMin = ev.target?.result;
    };
    if (this.avatarImage) {
      fr.readAsDataURL(this.avatarImage);
    }
    console.log('AVATAR IMAGE VARIABLE: ', this.avatarImage);
  }
}
