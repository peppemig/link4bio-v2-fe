import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { buttons } from 'src/app/shared/constants/buttons';
import { Page } from 'src/app/shared/models/page.model';
import { ButtonService } from './services/button.service';
import { Subscription } from 'rxjs';
import { Button } from 'src/app/shared/models/button.model';

@Component({
  selector: 'app-buttons-form',
  templateUrl: './buttons-form.component.html',
  styleUrls: ['./buttons-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonsFormComponent implements OnInit, OnDestroy {
  @Input() pageData: Page | undefined;
  buttonsData = buttons;
  subs: Subscription[] = [];

  buttonsForm = new FormGroup({
    buttons: new FormArray([]),
  });

  constructor(private buttonSvc: ButtonService) {}

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
    this.subs.push(
      this.buttonSvc
        .saveButtonsToPage(
          this.pageData?.uri!,
          this.buttonsForm.value.buttons as Button[]
        )
        .subscribe(() => {
          this.buttonsForm.reset({
            buttons: [],
          });
          const buttonsFormArray = this.buttonsForm.get('buttons') as FormArray;
          buttonsFormArray.clear();
        })
    );
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

  checkFormButtonsContains(button: any) {
    return this.refButtonsForm.controls.some(
      (btn) => btn.value.name === button.name
    );
  }
}
