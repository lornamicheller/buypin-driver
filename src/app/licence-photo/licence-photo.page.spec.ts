import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicencePhotoPage } from './licence-photo.page';

describe('LicencePhotoPage', () => {
  let component: LicencePhotoPage;
  let fixture: ComponentFixture<LicencePhotoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicencePhotoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicencePhotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
