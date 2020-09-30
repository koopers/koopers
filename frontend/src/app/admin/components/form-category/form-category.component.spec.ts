import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { FormCategoryComponent } from './form-category.component';
import {CategoriesServiceStub, AlertsServiceStub} from '@utils/stubs/stubs';
import {CategoriesService} from '@core/services/categories/categories.service';
import { AlertsService } from '@core/services/alerts/alerts.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

export class LocationStub {
  back(): void {}
}

describe('FormCategoryComponent', () => {
  let component: FormCategoryComponent;
  let fixture: ComponentFixture<FormCategoryComponent>;
  let categoriesService, location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCategoryComponent ],
      providers: [
        {provide: CategoriesService, useClass: CategoriesServiceStub},
        {provide: AlertsService, useClass: AlertsServiceStub},
        {provide: Location, useClass: LocationStub}
      ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCategoryComponent);
    component = fixture.componentInstance;
    categoriesService = TestBed.inject(CategoriesService);
    location = fixture.debugElement.injector.get(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    const el = fixture.debugElement.query(By.css('#title-header'));
    expect(el).not.toBeNull();
  });

  it('should have text title', () => {
    const el = fixture.debugElement.query(By.css('#title-header'));
    expect(el.nativeElement.textContent.trim()).toBe('Nueva Categoría');
  });

  it('should have a title input', () => {
    const el = fixture.debugElement.query(By.css('#title'));
    expect(el).not.toBeNull();
  });

  it('should have a cancel btn', () => {
    const el = fixture.debugElement.query(By.css('#cancel-btn'));
    expect(el).not.toBeNull();
  });

  it('should have a save btn', () => {
    const el = fixture.debugElement.query(By.css('#save-btn'));
    expect(el).not.toBeNull();
  });

  it('should categoryForm', () => {
    expect(Object.keys(component.categoryForm.controls)).toEqual(['title']);
  });

  // it('when goBack should location back', () => {
  //   spyOn(location, 'back').and.callThrough();
  //   fixture.detectChanges();
  //   expect(location.back).toHaveBeenCalled();
  // });
});
