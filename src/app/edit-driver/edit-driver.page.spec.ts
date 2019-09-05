import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDriverPage } from './edit-driver.page';

describe('EditDriverPage', () => {
  let component: EditDriverPage;
  let fixture: ComponentFixture<EditDriverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDriverPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDriverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
