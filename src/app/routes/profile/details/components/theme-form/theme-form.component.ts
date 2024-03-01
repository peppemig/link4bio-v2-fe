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
import { Subscription } from 'rxjs';
import { Page } from 'src/app/shared/models/page.model';
import { ThemeService } from './services/theme.service';
import { LoadingHandler } from 'src/app/shared/handlers/loading-handler';

@Component({
  selector: 'app-theme-form',
  templateUrl: './theme-form.component.html',
  styleUrls: ['./theme-form.component.scss'],
})
export class ThemeFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input() pageData: Page | undefined;
  @Output() themeMutationEvent = new EventEmitter();
  loadingThemeMutation = new LoadingHandler();

  subs: Subscription[] = [];

  themeForm = new FormGroup({
    backgroundColor: new FormControl('#000', Validators.required),
    textColor: new FormControl('#000', Validators.required),
    buttonColor: new FormControl('#000', Validators.required),
    buttonTextColor: new FormControl('#000', Validators.required),
  });

  constructor(private themeSvc: ThemeService) {}

  ngOnInit(): void {
    this.themeForm.setValidators(this.sameValueValidator.bind(this));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pageData'] && changes['pageData'].currentValue) {
      if (this.pageData?.theme) {
        this.themeForm.setValue({
          backgroundColor: this.pageData?.theme.backgroundColor,
          textColor: this.pageData?.theme.textColor,
          buttonColor: this.pageData?.theme.buttonColor,
          buttonTextColor: this.pageData?.theme.buttonTextColor,
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  editTheme() {
    if (this.themeForm.invalid) return;
    this.loadingThemeMutation.start();
    const { backgroundColor, textColor, buttonColor, buttonTextColor } =
      this.themeForm.value;
    this.subs.push(
      this.themeSvc
        .saveThemeToPage(this.pageData?.uri!, {
          backgroundColor: backgroundColor!,
          textColor: textColor!,
          buttonColor: buttonColor!,
          buttonTextColor: buttonTextColor!,
        })
        .subscribe({
          next: () => {
            this.loadingThemeMutation.stop();
            this.themeMutationEvent.emit();
          },
          error: () => {
            this.loadingThemeMutation.stop();
          },
        })
    );
  }

  sameValueValidator(control: AbstractControl): ValidationErrors | null {
    const currentBackgroundColor = control.get('backgroundColor');
    const currentTextColor = control.get('textColor');
    const currentButtonColor = control.get('buttonColor');
    const currentButtonTextColor = control.get('buttonTextColor');
    const theme = this.pageData?.theme;
    return currentBackgroundColor?.value === theme?.backgroundColor &&
      currentTextColor?.value === theme?.textColor &&
      currentButtonColor?.value === theme?.buttonColor &&
      currentButtonTextColor?.value === theme?.buttonTextColor
      ? { samevalue: true }
      : null;
  }
}
