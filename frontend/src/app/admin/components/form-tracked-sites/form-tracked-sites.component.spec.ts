import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { FormTrackedSitesComponent } from './form-tracked-sites.component';
import { TrackedSitesService } from '@core/services/tracked-sites/tracked-sites.service';
import { TrackedSitesServiceStub, AlertsServiceStub, LocationStub, CategoriesServiceStub, SitesServiceStub } from '@utils/stubs/stubs';
import { AlertsService } from '@core/services/alerts/alerts.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CategoriesService } from '@core/services/categories/categories.service';
import { SitesService } from '@core/services/sites/sites.service';
import { DropdownModule } from 'primeng/dropdown';
import { By } from '@angular/platform-browser';
import { trackedSites } from '@utils/mocks/mocks';

describe('FormTrackedSitesComponent', () => {
  let component: FormTrackedSitesComponent;
  let fixture: ComponentFixture<FormTrackedSitesComponent>;
  let trackedSitesService, location, activatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTrackedSitesComponent ],
      providers: [
        {provide: TrackedSitesService, useClass: TrackedSitesServiceStub},
        {provide: CategoriesService, useClass: CategoriesServiceStub},
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
            path: 'sections/new',
            component: FormTrackedSitesComponent
          },
          {
            path: 'sections/:id',
            component: FormTrackedSitesComponent
          }
        ]),
        ReactiveFormsModule,
        DropdownModule
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTrackedSitesComponent);
    component = fixture.componentInstance;
    trackedSitesService = TestBed.inject(TrackedSitesService);
    location = TestBed.inject(Location);
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    fixture.detectChanges();
  });

  afterAll(() => {
    trackedSitesService = null;
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
    expect(el.nativeElement.textContent.trim()).toBe('Nueva Sección');
  });

  it('should have a path_url input', () => {
    const el = fixture.debugElement.query(By.css('#path_url'));
    expect(el).not.toBeNull();
  });

  it('should have a site_id input', () => {
    const el = fixture.debugElement.query(By.css('#site_id'));
    expect(el).not.toBeNull();
  });

  it('should have a category_id input', () => {
    const el = fixture.debugElement.query(By.css('#category_id'));
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

  it('should have trackedSiteForm', () => {
    expect(Object.keys(component.trackedSiteForm.controls)).toEqual(['path_url', 'site_id', 'category_id']);
  });

  it('should not have currentTrackedSite', () => {
    expect(component.currentTrackedSite).toBeUndefined();
  });

  it('when onSave should call create', () => {
    spyOn(trackedSitesService, 'create').and.callThrough();
    component.onSave();
    expect(trackedSitesService.create).toHaveBeenCalledWith(
      component.trackedSiteForm.value
    );
  });

  it('when router has id should call getOne', () => {
    spyOn(trackedSitesService, 'getOne').and.callThrough();
    activatedRoute.params = of({id: 3});
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(trackedSitesService.getOne).toHaveBeenCalledWith(3);
    });
  });

  it('when getOne returns should call set current tracked site', () => {
    spyOn(trackedSitesService, 'getOne').and.returnValue(of(trackedSitesService[0]));
    activatedRoute.params = of({id: 3});
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.currentTrackedSite).toEqual(trackedSitesService[0]);
  });

  it('when goBack should location back', () => {
    spyOn(location, 'back');
    component.goBack();
    expect(location.back).toHaveBeenCalled();
  });

  describe('when have a currentTrackedSite', () => {
    beforeEach(() => {
      component.currentTrackedSite = trackedSites[0];
      fixture.detectChanges();
    });

    it('should have text title', () => {
      const el = fixture.debugElement.query(By.css('#title-header'));
      expect(el.nativeElement.textContent.trim()).toBe('Editar Sección');
    });

    it('should have currentTrackedSite', () => {
      expect(component.currentTrackedSite).not.toBeUndefined();
    });

    it('when onSave should call update', () => {
      spyOn(trackedSitesService, 'update').and.callThrough();
      component.onSave();
      expect(trackedSitesService.update).toHaveBeenCalledWith(
        trackedSites[0].id,
        component.trackedSiteForm.value
      );
    });
  });

});
