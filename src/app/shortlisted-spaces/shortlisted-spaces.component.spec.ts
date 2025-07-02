import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShortlistedSpacesComponent } from './shortlisted-spaces.component';

describe('ShortlistedSpacesComponent', () => {
  let component: ShortlistedSpacesComponent;
  let fixture: ComponentFixture<ShortlistedSpacesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ShortlistedSpacesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortlistedSpacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
