import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconModule } from '../../shared/icon/icon.module';

import { CoWorkingVisitScheduleComponent } from './co-working-visit-schedule.component';

describe('CoWorkingVisitScheduleComponent', () => {
  let component: CoWorkingVisitScheduleComponent;
  let fixture: ComponentFixture<CoWorkingVisitScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoWorkingVisitScheduleComponent],
      imports: [IconModule]
    });
    fixture = TestBed.createComponent(CoWorkingVisitScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
