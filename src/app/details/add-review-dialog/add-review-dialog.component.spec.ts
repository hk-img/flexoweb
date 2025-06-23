import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared/shared.module';

import { AddReviewDialogComponent } from './add-review-dialog.component';

describe('AddReviewDialogComponent', () => {
  let component: AddReviewDialogComponent;
  let fixture: ComponentFixture<AddReviewDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, SlickCarouselModule, ReactiveFormsModule, FormsModule, SharedModule],
      declarations: [AddReviewDialogComponent]
    });
    fixture = TestBed.createComponent(AddReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
