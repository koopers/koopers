import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import {InputSwitchModule} from 'primeng/inputswitch';
import { FormSiteComponent } from './form-site.component';
import { SitesService } from '@core/services/sites/sites.service';
import { SitesServiceStub, AlertsServiceStub, LocationStub } from '@utils/stubs/stubs';
import { AlertsService } from '@core/services/alerts/alerts.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { sites } from '@utils/mocks/mocks';

describe('FormSiteComponent', () => {
  let component: FormSiteComponent;
  let fixture: ComponentFixture<FormSiteComponent>;
  let sitesService, location, activatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSiteComponent ],
      providers: [
        {provide: SitesService, useClass: SitesServiceStub},
        {provide: AlertsService, useClass: AlertsServiceStub},
        {provide: Location, useClass: LocationStub},
        {provide: ActivatedRoute, useValue: {
          params: of({})
        }}
      ],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'sites/new',
            component: FormSiteComponent
          },
          {
            path: 'sites/:id',
            component: FormSiteComponent
          }
        ]),
        ReactiveFormsModule,
        InputSwitchModule
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSiteComponent);
    component = fixture.componentInstance;
    sitesService = TestBed.inject(SitesService);
    location = TestBed.inject(Location);
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    fixture.detectChanges();
  });

  afterAll(() => {
    sitesService = null;
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
    expect(el.nativeElement.textContent.trim()).toBe('Nuevo Sitio');
  });

  it('should have a title input', () => {
    const el = fixture.debugElement.query(By.css('#title'));
    expect(el).not.toBeNull();
  });

  it('should have a url input', () => {
    const el = fixture.debugElement.query(By.css('#url'));
    expect(el).not.toBeNull();
  });

  it('should have a available input', () => {
    const el = fixture.debugElement.query(By.css('#available'));
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

  it('should have siteForm', () => {
    expect(Object.keys(component.siteForm.controls)).toEqual(['title', 'url', 'available']);
  });

  it('should not have currentSite', () => {
    expect(component.currentSite).toBeUndefined();
  });

  it('when onSave should call create', () => {
    spyOn(sitesService, 'create').and.callThrough();
    component.onSave();
    expect(sitesService.create).toHaveBeenCalledWith(
      component.siteForm.value
    );
  });

  it('when goBack should location back', () => {
    spyOn(location, 'back');
    component.goBack();
    expect(location.back).toHaveBeenCalled();
  });

  it('when router has id should call getOne', () => {
    spyOn(sitesService, 'getOne').and.callThrough();
    activatedRoute.params = of({id: 3});
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(sitesService.getOne).toHaveBeenCalledWith(3);
    });
  });

  it('when getOne returns should call set current site', () => {
    spyOn(sitesService, 'getOne').and.returnValue(of(sites[0]));
    activatedRoute.params = of({id: 3});
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.currentSite).toEqual(sites[0]);
  });

  describe('when have a currentSite', () => {
    beforeEach(() => {
      component.currentSite = sites[0];
      fixture.detectChanges();
    });

    it('should have text title', () => {
      const el = fixture.debugElement.query(By.css('#title-header'));
      expect(el.nativeElement.textContent.trim()).toBe('Editar Sitio');
    });

    it('should have currentSite', () => {
      expect(component.currentSite).not.toBeUndefined();
    });

    it('when onSave should call update', () => {
      spyOn(sitesService, 'update').and.callThrough();
      component.onSave();
      expect(sitesService.update).toHaveBeenCalledWith(
        sites[0].id,
        component.siteForm.value
      );
    });
  });
});
