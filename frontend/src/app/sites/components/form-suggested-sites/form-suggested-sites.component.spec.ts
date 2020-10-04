import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { FormSuggestedSitesComponent } from './form-suggested-sites.component';
import { SuggestedSitesService } from '@core/services/suggested-sites/suggested-sites.service';
import { SuggestedSitesServiceStub, AlertsServiceStub, LocationStub } from '@utils/stubs/stubs';
import { AlertsService } from '@core/services/alerts/alerts.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('FormSuggestedSitesComponent', () => {
  let component: FormSuggestedSitesComponent;
  let fixture: ComponentFixture<FormSuggestedSitesComponent>;
  let suggestedSitesService, location, activatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSuggestedSitesComponent ],
      providers: [
        {provide: SuggestedSitesService, useClass: SuggestedSitesServiceStub},
        {provide: AlertsService, useClass: AlertsServiceStub},
        {provide: Location, useClass: LocationStub},
        {provide: ActivatedRoute, useValue: {
          params: of({})
        }}
      ],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'proposals',
            component: FormSuggestedSitesComponent
          }
        ]),
        ReactiveFormsModule
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSuggestedSitesComponent);
    component = fixture.componentInstance;
    suggestedSitesService = TestBed.inject(SuggestedSitesService);
    location = TestBed.inject(Location);
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    fixture.detectChanges();
  });

  afterAll(() => {
    suggestedSitesService = null;
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
    expect(el.nativeElement.textContent.trim()).toBe('Nueva Propuesta');
  });

  it('should have a title input', () => {
    const el = fixture.debugElement.query(By.css('#title'));
    expect(el).not.toBeNull();
  });

  it('should have a url input', () => {
    const el = fixture.debugElement.query(By.css('#url'));
    expect(el).not.toBeNull();
  });

  it('should have add-category', () => {
    const el = fixture.debugElement.query(By.css('#add-category-btn'));
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

  it('should have suggestedForm', () => {
    expect(Object.keys(component.suggestedForm.controls)).toEqual(['title', 'url', 'categories']);
  });

  it('should addCategory empty', () => {
    expect(component.categories.length).toEqual(0);
    component.addCategory();
    fixture.detectChanges();
    expect(component.categories.length).toEqual(1);
  });

  it('should addCategory', () => {
    expect(component.categories.length).toEqual(0);
    component.addCategory('Testing');
    fixture.detectChanges();
    expect(component.categories.length).toEqual(1);
  });

  it('should removeCategory', () => {
    component.addCategory('Testing');
    fixture.detectChanges();
    expect(component.categories.length).toEqual(1);
    component.removeCategory(0);
    fixture.detectChanges();
    expect(component.categories.length).toEqual(0);
  });

  it('when onSave should call create', () => {
    spyOn(suggestedSitesService, 'create').and.callThrough();
    component.onSave();
    expect(suggestedSitesService.create).toHaveBeenCalled();
  });

  it('when goBack should location back', () => {
    spyOn(location, 'back');
    component.goBack();
    expect(location.back).toHaveBeenCalled();
  });

});
