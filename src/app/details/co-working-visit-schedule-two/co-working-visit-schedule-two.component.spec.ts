import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared/shared.module';

import { CoWorkingVisitScheduleTwoComponent } from './co-working-visit-schedule-two.component';

describe('CoWorkingVisitScheduleTwoComponent', () => {
  let component: CoWorkingVisitScheduleTwoComponent;
  let fixture: ComponentFixture<CoWorkingVisitScheduleTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, SlickCarouselModule, ReactiveFormsModule, FormsModule, SharedModule],
      declarations: [CoWorkingVisitScheduleTwoComponent]
    });
    fixture = TestBed.createComponent(CoWorkingVisitScheduleTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
