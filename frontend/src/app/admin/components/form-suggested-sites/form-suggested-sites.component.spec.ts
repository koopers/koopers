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
});
