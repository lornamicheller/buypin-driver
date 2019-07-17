import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVehiclePage } from './edit-vehicle.page';

describe('EditVehiclePage', () => {
  let component: EditVehiclePage;
  let fixture: ComponentFixture<EditVehiclePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVehiclePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVehiclePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
