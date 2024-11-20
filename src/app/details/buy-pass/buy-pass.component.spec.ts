import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyPassComponent } from './buy-pass.component';

describe('BuyPassComponent', () => {
  let component: BuyPassComponent;
  let fixture: ComponentFixture<BuyPassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
