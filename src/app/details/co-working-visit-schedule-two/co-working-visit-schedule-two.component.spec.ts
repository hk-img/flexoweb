import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconModule } from '../../shared/icon/icon.module';

import { CoWorkingVisitScheduleTwoComponent } from './co-working-visit-schedule-two.component';

describe('CoWorkingVisitScheduleTwoComponent', () => {
  let component: CoWorkingVisitScheduleTwoComponent;
  let fixture: ComponentFixture<CoWorkingVisitScheduleTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoWorkingVisitScheduleTwoComponent],
      imports: [IconModule]
    });
    fixture = TestBed.createComponent(CoWorkingVisitScheduleTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
