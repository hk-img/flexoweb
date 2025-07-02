import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CityListingComponent } from './city-listing.component';

describe('CityListingComponent', () => {
  let component: CityListingComponent;
  let fixture: ComponentFixture<CityListingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CityListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
