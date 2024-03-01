import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSkeletonComponent } from './input-skeleton.component';

describe('InputSkeletonComponent', () => {
  let component: InputSkeletonComponent;
  let fixture: ComponentFixture<InputSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSkeletonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
