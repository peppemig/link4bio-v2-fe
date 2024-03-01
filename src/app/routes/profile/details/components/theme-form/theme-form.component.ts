import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-theme-form',
  templateUrl: './theme-form.component.html',
  styleUrls: ['./theme-form.component.scss'],
})
export class ThemeFormComponent implements OnInit {
  themeForm = new FormGroup({
    backgroundColor: new FormControl('#000', Validators.required),
    textColor: new FormControl('#000', Validators.required),
    buttonColor: new FormControl('#000', Validators.required),
    buttonTextColor: new FormControl('#000', Validators.required),
  });

  constructor() {}

  ngOnInit(): void {}
}
