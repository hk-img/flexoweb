import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostTermConditionComponent } from './host-term-condition.component';

describe('HostTermConditionComponent', () => {
  let component: HostTermConditionComponent;
  let fixture: ComponentFixture<HostTermConditionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostTermConditionComponent]
    });
    fixture = TestBed.createComponent(HostTermConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
