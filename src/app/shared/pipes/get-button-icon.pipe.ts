import { Pipe, PipeTransform } from '@angular/core';
import { buttons } from 'src/app/shared/constants/buttons';
import { Button } from 'src/app/shared/models/button.model';

@Pipe({
  name: 'getButtonIcon',
})
export class GetButtonIconPipe implements PipeTransform {
  transform(button: Button) {
    const foundBtn = buttons.find((btn) => btn.name === button.name);
    return foundBtn!.icon;
  }
}
