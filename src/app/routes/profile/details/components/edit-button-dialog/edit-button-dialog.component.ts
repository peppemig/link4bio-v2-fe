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
import { Button } from 'src/app/shared/models/button.model';
import { ButtonService } from '../buttons-form/services/button.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-button-dialog',
  templateUrl: './edit-button-dialog.component.html',
  styleUrls: ['./edit-button-dialog.component.scss'],
})
export class EditButtonDialogComponent implements OnInit, OnDestroy {
  @Output() dialogMutationEvent = new EventEmitter();

  buttonForm = new FormGroup({
    url: new FormControl(this.button.url, [Validators.required]),
  });
  subs: Subscription[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public button: Button,
    private buttonSvc: ButtonService,
    private dialogRef: MatDialogRef<EditButtonDialogComponent>
  ) {}

  ngOnInit(): void {
    this.buttonForm.setValidators(this.sameValueValidator.bind(this));
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  editButton() {
    if (this.buttonForm.invalid) return;
    const { url } = this.buttonForm.value;
    this.subs.push(
      this.buttonSvc.editButton(this.button.id, url!).subscribe(() => {
        this.dialogMutationEvent.emit();
        this.dialogRef.close();
      })
    );
  }

  deleteButton() {
    this.subs.push(
      this.buttonSvc.deleteButton(this.button.id).subscribe(() => {
        this.dialogMutationEvent.emit();
        this.dialogRef.close();
      })
    );
  }

  sameValueValidator(control: AbstractControl): ValidationErrors | null {
    const currentUrl = control.get('url');
    return currentUrl?.value === this.button.url ? { samevalue: true } : null;
  }
}
