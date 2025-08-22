import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreinquiryComponent } from './exploreinquiry.component';

describe('ExploreinquiryComponent', () => {
  let component: ExploreinquiryComponent;
  let fixture: ComponentFixture<ExploreinquiryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExploreinquiryComponent]
    });
    fixture = TestBed.createComponent(ExploreinquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
