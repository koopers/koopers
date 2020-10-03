import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSuggestedSitesComponent } from './dashboard-suggested-sites.component';
import { SuggestedSitesService } from '@core/services/suggested-sites/suggested-sites.service';
import { SuggestedSitesServiceStub, AlertsServiceStub } from '@utils/stubs/stubs';
import { ConfirmationService } from 'primeng/api';
import { AlertsService } from '@core/services/alerts/alerts.service';
import { TableModule } from 'primeng/table';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DashboardSuggestedSitesComponent', () => {
  let component: DashboardSuggestedSitesComponent;
  let fixture: ComponentFixture<DashboardSuggestedSitesComponent>;
  let suggestedSitesService, confirmationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSuggestedSitesComponent ],
      providers: [
        ConfirmationService,
        {provide: SuggestedSitesService, useClass: SuggestedSitesServiceStub},
        {provide: AlertsService, useClass: AlertsServiceStub}
      ],
      imports: [
        TableModule
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSuggestedSitesComponent);
    component = fixture.componentInstance;
    suggestedSitesService = TestBed.inject(SuggestedSitesService);
    confirmationService = fixture.debugElement.injector.get(ConfirmationService);
    fixture.detectChanges();
  });

  afterAll(() => {
    suggestedSitesService = null;
    confirmationService = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
