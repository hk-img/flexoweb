import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../material.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared/shared.module';

import { ThankyopopupComponent } from './thankyopopup.component';

describe('ThankyopopupComponent', () => {
  let component: ThankyopopupComponent;
  let fixture: ComponentFixture<ThankyopopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, SlickCarouselModule, ReactiveFormsModule, FormsModule, SharedModule],
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
