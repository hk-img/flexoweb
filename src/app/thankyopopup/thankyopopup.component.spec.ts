import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankyopopupComponent } from './thankyopopup.component';

describe('ThankyopopupComponent', () => {
  let component: ThankyopopupComponent;
  let fixture: ComponentFixture<ThankyopopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThankyopopupComponent]
    });
    fixture = TestBed.createComponent(ThankyopopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
