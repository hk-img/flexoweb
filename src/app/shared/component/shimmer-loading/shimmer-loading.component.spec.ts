import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShimmerLoadingComponent } from './shimmer-loading.component';

describe('ShimmerLoadingComponent', () => {
  let component: ShimmerLoadingComponent;
  let fixture: ComponentFixture<ShimmerLoadingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ShimmerLoadingComponent]
    });
    fixture = TestBed.createComponent(ShimmerLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
