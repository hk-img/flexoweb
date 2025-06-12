import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconModule } from '../shared/icon/icon.module';

import { BookingListComponent } from './booking-list.component';

describe('BookingListComponent', () => {
  let component: BookingListComponent;
  let fixture: ComponentFixture<BookingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingListComponent],
      imports: [IconModule]
    });
    fixture = TestBed.createComponent(BookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
