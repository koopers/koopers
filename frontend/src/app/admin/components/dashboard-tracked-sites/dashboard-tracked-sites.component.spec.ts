import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTrackedSitesComponent } from './dashboard-tracked-sites.component';
import { ConfirmationService } from 'primeng/api';
import { TrackedSitesService } from '@core/services/tracked-sites/tracked-sites.service';
import { TrackedSitesServiceStub, AlertsServiceStub } from '@utils/stubs/stubs';
import { AlertsService } from '@core/services/alerts/alerts.service';
import { TableModule } from 'primeng/table';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DashboardTrackedSitesComponent', () => {
  let component: DashboardTrackedSitesComponent;
  let fixture: ComponentFixture<DashboardTrackedSitesComponent>;
  let trackedSitesService, confirmationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTrackedSitesComponent ],
      providers: [
        ConfirmationService,
        {provide: TrackedSitesService, useClass: TrackedSitesServiceStub},
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
    fixture = TestBed.createComponent(DashboardTrackedSitesComponent);
    component = fixture.componentInstance;
    trackedSitesService = TestBed.inject(TrackedSitesService);
    confirmationService = fixture.debugElement.injector.get(ConfirmationService);
    fixture.detectChanges();
  });

  afterAll(() => {
    trackedSitesService = null;
    confirmationService = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
