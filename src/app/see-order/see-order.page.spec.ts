import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeOrderPage } from './see-order.page';

describe('SeeOrderPage', () => {
  let component: SeeOrderPage;
  let fixture: ComponentFixture<SeeOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeOrderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
