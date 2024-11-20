import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JoyOfGivingComponent } from './joy-of-giving.component';

describe('JoyOfGivingComponent', () => {
  let component: JoyOfGivingComponent;
  let fixture: ComponentFixture<JoyOfGivingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JoyOfGivingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoyOfGivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
