import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveColumnComponent } from './active-column.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';

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

  it('should have default text', () => {
    expect(component.text).toEqual('No Activo');
  });

  it('should have default active', () => {
    expect(component.active).toBeFalse();
  });

  it('should have default dotClass', () => {
    expect(component.dotClass).toEqual('circle--error');
  });

  describe('when active is true', () => {
    beforeEach(() => {
      const changes = {active: new SimpleChange(false, true, true)};
      component.ngOnChanges(changes);
      fixture.detectChanges();
    });

    it('should text be Activo', () => {
      expect(component.text).toEqual('Activo');
    });

    it('should dotClass be circle--success', () => {
      expect(component.dotClass).toEqual('circle--success');
    });
  });

  describe('when active is false', () => {
    beforeEach(() => {
      const changes = {active: new SimpleChange(true, false, false)};
      component.ngOnChanges(changes);
      fixture.detectChanges();
    });

    it('should text be No Activo', () => {
      expect(component.text).toEqual('No Activo');
    });

    it('should dotClass be circle--error', () => {
      expect(component.dotClass).toEqual('circle--error');
    });
  });

});
