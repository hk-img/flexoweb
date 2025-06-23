import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared/shared.module';

import { CoWorkingVisitScheduleComponent } from './co-working-visit-schedule.component';

describe('CoWorkingVisitScheduleComponent', () => {
  let component: CoWorkingVisitScheduleComponent;
  let fixture: ComponentFixture<CoWorkingVisitScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, SlickCarouselModule, ReactiveFormsModule, FormsModule, SharedModule],
      declarations: [CoWorkingVisitScheduleComponent]
    });
    fixture = TestBed.createComponent(CoWorkingVisitScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
