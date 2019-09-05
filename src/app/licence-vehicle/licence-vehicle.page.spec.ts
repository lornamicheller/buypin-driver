import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenceVehiclePage } from './licence-vehicle.page';

describe('LicenceVehiclePage', () => {
  let component: LicenceVehiclePage;
  let fixture: ComponentFixture<LicenceVehiclePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenceVehiclePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenceVehiclePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
