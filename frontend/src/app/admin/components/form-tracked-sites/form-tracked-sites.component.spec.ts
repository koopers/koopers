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
});
