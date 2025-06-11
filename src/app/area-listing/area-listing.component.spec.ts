import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IconModule } from '../shared/icon/icon.module';

import { AreaListingComponent } from './area-listing.component';

describe('AreaListingComponent', () => {
  let component: AreaListingComponent;
  let fixture: ComponentFixture<AreaListingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaListingComponent ],
      imports: [IconModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
