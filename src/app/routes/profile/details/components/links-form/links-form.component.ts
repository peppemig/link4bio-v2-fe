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
import { Subscription } from 'rxjs';
import { Page } from 'src/app/shared/models/page.model';
import { LinkService } from './services/link.service';
import { Link } from 'src/app/shared/models/link.model';
import { MatDialog } from '@angular/material/dialog';
import { EditLinkDialogComponent } from '../edit-link-dialog/edit-link-dialog.component';

@Component({
  selector: 'app-links-form',
  templateUrl: './links-form.component.html',
  styleUrls: ['./links-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinksFormComponent implements OnInit, OnDestroy {
  @Input() pageData: Page | undefined;
  @Output() linkMutationEvent = new EventEmitter();

  subs: Subscription[] = [];

  linksForm = new FormGroup({
    links: new FormArray([]),
  });

  constructor(private linkSvc: LinkService, private dialog: MatDialog) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  get refLinksForm(): FormArray {
    return this.linksForm.get('links') as FormArray;
  }

  getFormGroupAt(i: number) {
    return this.refLinksForm.at(i) as FormGroup;
  }

  saveLinks() {
    this.subs.push(
      this.linkSvc
        .saveLinksToPage(
          this.pageData?.uri!,
          this.linksForm.value.links as Link[]
        )
        .subscribe(() => {
          this.linksForm.reset({
            links: [],
          });
          const linksFormArray = this.linksForm.get('links') as FormArray;
          linksFormArray.clear();
          this.linkMutationEvent.emit();
        })
    );
  }

  openEditLinkDialog(link: Link) {
    let dialogRef = this.dialog.open(EditLinkDialogComponent, {
      data: link,
    });
    const sub = dialogRef.componentInstance.dialogMutationEvent.subscribe(
      () => {
        this.linkMutationEvent.emit();
      }
    );
    dialogRef.afterClosed().subscribe(() => {});
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
  }

  removeLink(index: number) {
    const linksFormArray = this.linksForm.get('links') as FormArray;
    if (index >= 0 && index < linksFormArray.length) {
      linksFormArray.removeAt(index);
    } else {
      console.error('Invalid index provided for link removal');
    }
  }
}
