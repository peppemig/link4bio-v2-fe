import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { buttons } from 'src/app/shared/constants/buttons';

@Component({
  selector: 'app-buttons-form',
  templateUrl: './buttons-form.component.html',
  styleUrls: ['./buttons-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonsFormComponent implements OnInit {
  buttonsData = buttons;

  buttonsForm = new FormGroup({
    buttons: new FormArray([]),
  });

  constructor() {}

  ngOnInit(): void {}

  get refButtonsForm(): FormArray {
    return this.buttonsForm.get('buttons') as FormArray;
  }

  getFormGroupAt(i: number) {
    return this.refButtonsForm.at(i) as FormGroup;
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
    console.log(this.buttonsForm.value);
  }

  removeButton(index: number) {
    const buttonsFormArray = this.buttonsForm.get('buttons') as FormArray;
    if (index >= 0 && index < buttonsFormArray.length) {
      buttonsFormArray.removeAt(index);
      console.log(this.buttonsForm.value);
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
