import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditButtonDialogComponent } from './edit-button-dialog.component';

describe('EditButtonDialogComponent', () => {
  let component: EditButtonDialogComponent;
  let fixture: ComponentFixture<EditButtonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditButtonDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditButtonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
