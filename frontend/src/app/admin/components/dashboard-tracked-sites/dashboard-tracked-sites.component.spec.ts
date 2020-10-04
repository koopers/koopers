import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTrackedSitesComponent } from './dashboard-tracked-sites.component';
import { ConfirmationService, Confirmation } from 'primeng/api';
import { TrackedSitesService } from '@core/services/tracked-sites/tracked-sites.service';
import { TrackedSitesServiceStub, AlertsServiceStub } from '@utils/stubs/stubs';
import { AlertsService } from '@core/services/alerts/alerts.service';
import { TableModule } from 'primeng/table';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { trackedSites } from '@utils/mocks/mocks';

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

  it('should have a p-table', () => {
    const el = fixture.debugElement.query(By.css('p-table'));
    expect(el).not.toBeNull();
  });

  it('should have a p-confirmDialog', () => {
    const el = fixture.debugElement.query(By.css('p-confirmDialog'));
    expect(el).not.toBeNull();
  });

  it('should have a new-tracked-site-btn', () => {
    const el = fixture.debugElement.query(By.css('#new-tracked-site-btn'));
    expect(el).not.toBeNull();
  });

  it('should have a edit-btn', () => {
    const el = fixture.debugElement.query(By.css('.edit-btn'));
    expect(el).not.toBeNull();
  });

  it('should have a delete-btn', () => {
    const el = fixture.debugElement.query(By.css('.delete-btn'));
    expect(el).not.toBeNull();
  });

  it('when ngOnInit should call getData', () => {
    spyOn((<any>component), 'getData');
    component.ngOnInit();
    expect((<any>component).getData).toHaveBeenCalled();
  });

  it('when getData should call service getAll', () => {
    spyOn(trackedSitesService, 'getAll').and.callThrough();
    (<any>component).getData();
    fixture.detectChanges();
    expect(trackedSitesService.getAll).toHaveBeenCalled();
  });

  it('when click delete-btn should call confirmDelete', () => {
    spyOn(component, 'confirmDelete');
    const debugElement = fixture.debugElement.query(By.css('.delete-btn'));
    const el: HTMLElement = debugElement.nativeElement;
    el.click();
    expect(component.confirmDelete).toHaveBeenCalled();
  });

  it('when confirmDelete should service call confirm', () => {
    spyOn(confirmationService, 'confirm').and.callThrough();
    component.confirmDelete(trackedSitesService[0]);
    expect(confirmationService.confirm).toHaveBeenCalled();
  });

  it('when confirmDelete should service delete', () => {
    const trackedSite = trackedSites[0];
    spyOn(trackedSitesService, 'delete').and.callThrough();
    spyOn(confirmationService, 'confirm').and.callFake((confirmation: Confirmation) => {
      confirmation.accept();
    });
    component.confirmDelete(trackedSite);
    fixture.detectChanges();
    expect(trackedSitesService.delete).toHaveBeenCalledWith(trackedSite.id);
  });

  it('when confirmDelete should call getData()', () => {
    const trackedSite = trackedSites[0];
    spyOn((<any>component), 'getData');
    spyOn(confirmationService, 'confirm').and.callFake((confirmation: Confirmation) => {
      confirmation.accept();
    });
    component.confirmDelete(trackedSite);
    fixture.detectChanges();
    expect((<any>component).getData).toHaveBeenCalled();
  });

});
