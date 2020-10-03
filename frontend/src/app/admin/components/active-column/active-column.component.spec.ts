import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveColumnComponent } from './active-column.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ActiveColumnComponent', () => {
  let component: ActiveColumnComponent;
  let fixture: ComponentFixture<ActiveColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveColumnComponent ],
      schemas: [
        NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
