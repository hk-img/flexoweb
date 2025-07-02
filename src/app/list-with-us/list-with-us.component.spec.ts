import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListWithUsComponent } from './list-with-us.component';

describe('ListWithUsComponent', () => {
  let component: ListWithUsComponent;
  let fixture: ComponentFixture<ListWithUsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListWithUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWithUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
