import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverInfoPage } from './driver-info.page';

describe('DriverInfoPage', () => {
  let component: DriverInfoPage;
  let fixture: ComponentFixture<DriverInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
