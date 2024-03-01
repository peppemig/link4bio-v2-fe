import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { buttons } from 'src/app/shared/constants/buttons';
import { Page } from 'src/app/shared/models/page.model';
import { ButtonService } from './services/button.service';
import { Subscription } from 'rxjs';
import { Button } from 'src/app/shared/models/button.model';
import { MatDialog } from '@angular/material/dialog';
import { EditButtonDialogComponent } from '../edit-button-dialog/edit-button-dialog.component';
import { LoadingHandler } from 'src/app/shared/handlers/loading-handler';

@Component({
  selector: 'app-buttons-form',
  templateUrl: './buttons-form.component.html',
  styleUrls: ['./buttons-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonsFormComponent implements OnInit, OnDestroy {
  @Input() pageData: Page | undefined;
  @Output() buttonMutationEvent = new EventEmitter();
  loadingButtonMutation = new LoadingHandler();

  buttonsData = buttons;
  subs: Subscription[] = [];

  buttonsForm = new FormGroup({
    buttons: new FormArray([]),
  });

  constructor(private buttonSvc: ButtonService, private dialog: MatDialog) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  get refButtonsForm(): FormArray {
    return this.buttonsForm.get('buttons') as FormArray;
  }

  getFormGroupAt(i: number) {
    return this.refButtonsForm.at(i) as FormGroup;
  }

  saveButtons() {
    this.loadingButtonMutation.start();
    this.subs.push(
      this.buttonSvc
        .saveButtonsToPage(
          this.pageData?.uri!,
          this.buttonsForm.value.buttons as Button[]
        )
        .subscribe({
          next: () => {
            this.buttonsForm.reset({
              buttons: [],
            });
            const buttonsFormArray = this.buttonsForm.get(
              'buttons'
            ) as FormArray;
            buttonsFormArray.clear();
            this.loadingButtonMutation.stop();
            this.buttonMutationEvent.emit();
          },
          error: () => {
            this.loadingButtonMutation.stop();
          },
        })
    );
  }

  openEditButtonDialog(button: Button) {
    let dialogRef = this.dialog.open(EditButtonDialogComponent, {
      data: button,
    });
    const sub = dialogRef.componentInstance.dialogMutationEvent.subscribe(
      () => {
        this.buttonMutationEvent.emit();
      }
    );
    dialogRef.afterClosed().subscribe(() => {});
  }

  addButton(button: any) {
    const buttonsFormArray = this.buttonsForm.get('buttons') as FormArray;
    buttonsFormArray.push(
      new FormGroup({
        name: new FormControl(button.name, [Validators.required]),
        url: new FormControl('', [Validators.required]),
        icon: new FormControl(button.icon),
        label: new FormControl(button.label),
      })
    );
  }

  removeButton(index: number) {
    const buttonsFormArray = this.buttonsForm.get('buttons') as FormArray;
    if (index >= 0 && index < buttonsFormArray.length) {
      buttonsFormArray.removeAt(index);
    } else {
      console.log('INVALID INDEX');
    }
  }

  checkFormButtonsContain(button: any) {
    return this.refButtonsForm.controls.some(
      (btn) => btn.value.name === button.name
    );
  }

  checkSavedButtonsContain(button: any) {
    return this.pageData?.buttons.some((btn) => btn.name === button.name);
  }
}
