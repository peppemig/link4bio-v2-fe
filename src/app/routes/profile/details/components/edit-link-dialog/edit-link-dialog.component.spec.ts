import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLinkDialogComponent } from './edit-link-dialog.component';

describe('EditLinkDialogComponent', () => {
  let component: EditLinkDialogComponent;
  let fixture: ComponentFixture<EditLinkDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLinkDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLinkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
