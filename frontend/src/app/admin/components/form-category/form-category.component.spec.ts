import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { FormCategoryComponent } from './form-category.component';
import {CategoriesServiceStub, AlertsServiceStub, LocationStub} from '@utils/stubs/stubs';
import {CategoriesService} from '@core/services/categories/categories.service';
import { AlertsService } from '@core/services/alerts/alerts.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { categories } from '@utils/mocks/mocks';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('FormCategoryComponent', () => {
  let component: FormCategoryComponent;
  let fixture: ComponentFixture<FormCategoryComponent>;
  let categoriesService, location, activatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCategoryComponent ],
      providers: [
        {provide: CategoriesService, useClass: CategoriesServiceStub},
        {provide: AlertsService, useClass: AlertsServiceStub},
        {provide: Location, useClass: LocationStub},
        {provide: ActivatedRoute, useValue: {
          params: of({})
        }}
      ],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'categories/new',
            component: FormCategoryComponent
          },
          {
            path: 'categories/:id',
            component: FormCategoryComponent
          }
        ]),
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
    location = TestBed.inject(Location);
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    fixture.detectChanges();
  });

  afterAll(() => {
    categoriesService = null;
    location = null;
    activatedRoute = null;
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

  it('should have categoryForm', () => {
    expect(Object.keys(component.categoryForm.controls)).toEqual(['title']);
  });

  it('should not have currentCategory', () => {
    expect(component.currentCategory).toBeUndefined();
  });

  it('when onSave should call create', () => {
    spyOn(categoriesService, 'create').and.callThrough();
    component.onSave();
    expect(categoriesService.create).toHaveBeenCalledWith(
      component.categoryForm.value
    );
  });

  it('when goBack should location back', () => {
    spyOn(location, 'back');
    component.goBack();
    expect(location.back).toHaveBeenCalled();
  });

  it('when router has id should call getOne', (done) => {
    spyOn(categoriesService, 'getOne').and.callThrough();
    activatedRoute.params = of({id: 3});
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(categoriesService.getOne).toHaveBeenCalledWith(3);
      done();
    });
  });

  it('when getOne returns should call set current category', () => {
    spyOn(categoriesService, 'getOne').and.returnValue(of(categories[0]));
    activatedRoute.params = of({id: 3});
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.currentCategory).toEqual(categories[0]);
  });

  describe('when have a currentCategory', () => {
    beforeEach(() => {
      component.currentCategory = categories[0];
      fixture.detectChanges();
    });

    it('should have text title', () => {
      const el = fixture.debugElement.query(By.css('#title-header'));
      expect(el.nativeElement.textContent.trim()).toBe('Editar Categoría');
    });

    it('should have currentCategory', () => {
      expect(component.currentCategory).not.toBeUndefined();
    });

    it('when onSave should call update', () => {
      spyOn(categoriesService, 'update').and.callThrough();
      component.onSave();
      expect(categoriesService.update).toHaveBeenCalledWith(
        categories[0].id,
        component.categoryForm.value
      );
    });
  });

});
