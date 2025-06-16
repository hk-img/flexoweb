import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconModule } from '../shared/icon/icon.module';

import { ThankyopopupComponent } from './thankyopopup.component';

describe('ThankyopopupComponent', () => {
  let component: ThankyopopupComponent;
  let fixture: ComponentFixture<ThankyopopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThankyopopupComponent],
      imports: [IconModule]
    });
    fixture = TestBed.createComponent(ThankyopopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
