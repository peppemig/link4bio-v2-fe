import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-links-form',
  templateUrl: './links-form.component.html',
  styleUrls: ['./links-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinksFormComponent implements OnInit {
  linksForm = new FormGroup({
    links: new FormArray([]),
  });

  constructor() {}

  ngOnInit(): void {}

  get refLinksForm(): FormArray {
    return this.linksForm.get('links') as FormArray;
  }

  getFormGroupAt(i: number) {
    return this.refLinksForm.at(i) as FormGroup;
  }

  addLink() {
    const linksFormArray = this.linksForm.get('links') as FormArray;
    linksFormArray.push(
      new FormGroup({
        title: new FormControl('', [Validators.required]),
        subtitle: new FormControl('', [Validators.required]),
        url: new FormControl('', [Validators.required]),
      })
    );
    console.log(this.linksForm.value);
    console.log('CONTROLS: ', this.refLinksForm.controls);
  }

  removeLink(index: number) {
    const linksFormArray = this.linksForm.get('links') as FormArray;
    if (index >= 0 && index < linksFormArray.length) {
      linksFormArray.removeAt(index);
      console.log(this.linksForm.value);
      console.log('CONTROLS: ', this.refLinksForm.controls);
    } else {
      console.error('Invalid index provided for link removal');
    }
  }
}
