import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningsPage } from './earnings.page';

describe('EarningsPage', () => {
  let component: EarningsPage;
  let fixture: ComponentFixture<EarningsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarningsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarningsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
