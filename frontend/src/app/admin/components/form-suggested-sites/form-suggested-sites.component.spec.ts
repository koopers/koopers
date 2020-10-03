import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { FormSuggestedSitesComponent } from './form-suggested-sites.component';
import { SuggestedSitesService } from '@core/services/suggested-sites/suggested-sites.service';
import { SuggestedSitesServiceStub, AlertsServiceStub, LocationStub } from '@utils/stubs/stubs';
import { AlertsService } from '@core/services/alerts/alerts.service';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { suggestedSites } from '@utils/mocks/mocks';

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
            path: 'proposals/:id',
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
    expect(el.nativeElement.textContent.trim()).toBe('Editar Propuesta');
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

  it('should not have currentSuggestedSite', () => {
    expect(component.currentSuggestedSite).toBeUndefined();
  });

  it('when onSave should not call update', () => {
    spyOn(suggestedSitesService, 'update');
    component.onSave();
    expect(suggestedSitesService.update).not.toHaveBeenCalled();
  });

  it('when goBack should location back', () => {
    spyOn(location, 'back');
    component.goBack();
    expect(location.back).toHaveBeenCalled();
  });

  it('when router has id should call getOne', () => {
    spyOn(suggestedSitesService, 'getOne').and.callThrough();
    activatedRoute.params = of({id: 3});
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(suggestedSitesService.getOne).toHaveBeenCalledWith(3);
    });
  });

  it('when getOne returns should call set current category', () => {
    spyOn(suggestedSitesService, 'getOne').and.returnValue(of(suggestedSites[0]));
    activatedRoute.params = of({id: 3});
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.currentSuggestedSite).toEqual({...suggestedSites[0], categories: JSON.parse(suggestedSites[0].categories) });
  });

  describe('when have a currentSuggestedSite', () => {
    beforeEach(() => {
      component.currentSuggestedSite = suggestedSites[0];
      fixture.detectChanges();
    });

    it('should have text title', () => {
      const el = fixture.debugElement.query(By.css('#title-header'));
      expect(el.nativeElement.textContent.trim()).toBe('Editar Propuesta');
    });

    it('should have currentSuggestedSite', () => {
      expect(component.currentSuggestedSite).not.toBeUndefined();
    });

    it('when onSave should call update', () => {
      spyOn(suggestedSitesService, 'update').and.callThrough();
      component.onSave();
      expect(suggestedSitesService.update).toHaveBeenCalledWith(
        suggestedSites[0].id,
        component.suggestedForm.value
      );
    });
  });

});
