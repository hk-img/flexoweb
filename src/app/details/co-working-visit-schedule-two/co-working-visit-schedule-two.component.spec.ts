import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoWorkingVisitScheduleTwoComponent } from './co-working-visit-schedule-two.component';

describe('CoWorkingVisitScheduleTwoComponent', () => {
  let component: CoWorkingVisitScheduleTwoComponent;
  let fixture: ComponentFixture<CoWorkingVisitScheduleTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
