import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconModule } from '../../shared/icon/icon.module';

import { BuyPassComponent } from './buy-pass.component';

describe('BuyPassComponent', () => {
  let component: BuyPassComponent;
  let fixture: ComponentFixture<BuyPassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyPassComponent],
      imports: [IconModule]
    });
    fixture = TestBed.createComponent(BuyPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
