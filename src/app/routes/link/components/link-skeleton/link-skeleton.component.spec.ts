import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkSkeletonComponent } from './link-skeleton.component';

describe('LinkSkeletonComponent', () => {
  let component: LinkSkeletonComponent;
  let fixture: ComponentFixture<LinkSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkSkeletonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
