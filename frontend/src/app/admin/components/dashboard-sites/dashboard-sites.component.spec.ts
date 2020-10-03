import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSitesComponent } from './dashboard-sites.component';
import { ConfirmationService } from 'primeng/api';
import { SitesService } from '@core/services/sites/sites.service';
import { SitesServiceStub, AlertsServiceStub } from '@utils/stubs/stubs';
import { AlertsService } from '@core/services/alerts/alerts.service';
import { TableModule } from 'primeng/table';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DashboardSitesComponent', () => {
  let component: DashboardSitesComponent;
  let fixture: ComponentFixture<DashboardSitesComponent>;
  let sitesService, confirmationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSitesComponent ],
      providers: [
        ConfirmationService,
        {provide: SitesService, useClass: SitesServiceStub},
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
    fixture = TestBed.createComponent(DashboardSitesComponent);
    component = fixture.componentInstance;
    sitesService = TestBed.inject(SitesService);
    confirmationService = fixture.debugElement.injector.get(ConfirmationService);
    fixture.detectChanges();
  });

  afterAll(() => {
    sitesService = null;
    confirmationService = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
