import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPicturePage } from './car-picture.page';

describe('CarPicturePage', () => {
  let component: CarPicturePage;
  let fixture: ComponentFixture<CarPicturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarPicturePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarPicturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
