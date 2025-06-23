import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared/shared.module';

import { BuyPassComponent } from './buy-pass.component';

describe('BuyPassComponent', () => {
  let component: BuyPassComponent;
  let fixture: ComponentFixture<BuyPassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, SlickCarouselModule, ReactiveFormsModule, FormsModule, SharedModule],
      declarations: [BuyPassComponent]
    });
    fixture = TestBed.createComponent(BuyPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
