import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared/shared.module';

import { RequestBookingComponent } from './request-booking.component';

describe('RequestBookingComponent', () => {
  let component: RequestBookingComponent;
  let fixture: ComponentFixture<RequestBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, SlickCarouselModule, ReactiveFormsModule, FormsModule, SharedModule],
      declarations: [RequestBookingComponent]
    });
    fixture = TestBed.createComponent(RequestBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
