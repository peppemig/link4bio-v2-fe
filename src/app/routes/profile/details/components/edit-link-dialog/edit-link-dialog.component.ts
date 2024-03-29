import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Link } from 'src/app/shared/models/link.model';
import { LinkService } from '../links-form/services/link.service';
import { LoadingHandler } from 'src/app/shared/handlers/loading-handler';

@Component({
  selector: 'app-edit-link-dialog',
  templateUrl: './edit-link-dialog.component.html',
  styleUrls: ['./edit-link-dialog.component.scss'],
})
export class EditLinkDialogComponent implements OnInit, OnDestroy {
  @Output() dialogMutationEvent = new EventEmitter();
  loadingMutation = new LoadingHandler();

  linkForm = new FormGroup({
    title: new FormControl(this.link.title, [Validators.required]),
    subtitle: new FormControl(this.link.subtitle, [Validators.required]),
    url: new FormControl(this.link.url, [Validators.required]),
  });
  subs: Subscription[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public link: Link,
    private linkSvc: LinkService,
    private dialogRef: MatDialogRef<EditLinkDialogComponent>
  ) {}

  ngOnInit(): void {
    this.linkForm.setValidators(this.sameValueValidator.bind(this));
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  editLink() {
    if (this.linkForm.invalid) return;
    this.dialogRef.disableClose = true;
    this.loadingMutation.start();
    const { title, subtitle, url } = this.linkForm.value;
    this.subs.push(
      this.linkSvc
        .editLink(this.link.id, {
          title: title!,
          subtitle: subtitle!,
          url: url!,
        })
        .subscribe({
          next: () => {
            this.dialogMutationEvent.emit();
            this.dialogRef.close();
            this.loadingMutation.stop();
          },
          error: () => {
            this.dialogRef.disableClose = false;
            this.loadingMutation.stop();
          },
        })
    );
  }

  deleteLink() {
    this.dialogRef.disableClose = true;
    this.loadingMutation.start();
    this.subs.push(
      this.linkSvc.deleteLink(this.link.id).subscribe({
        next: () => {
          this.dialogMutationEvent.emit();
          this.dialogRef.close();
          this.loadingMutation.stop();
        },
        error: () => {
          this.dialogRef.disableClose = false;
          this.loadingMutation.stop();
        },
      })
    );
  }

  sameValueValidator(control: AbstractControl): ValidationErrors | null {
    const currentTitle = control.get('title');
    const currentSubtitle = control.get('subtitle');
    const currentUrl = control.get('url');
    return currentTitle?.value === this.link.title &&
      currentSubtitle?.value === this.link.subtitle &&
      currentUrl?.value === this.link.url
      ? { samevalue: true }
      : null;
  }
}
