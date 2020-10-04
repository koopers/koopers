import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSitesComponent } from './dashboard-sites.component';
import { ConfirmationService, Confirmation } from 'primeng/api';
import { SitesService } from '@core/services/sites/sites.service';
import { SitesServiceStub, AlertsServiceStub } from '@utils/stubs/stubs';
import { AlertsService } from '@core/services/alerts/alerts.service';
import { TableModule } from 'primeng/table';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { sites } from '@utils/mocks/mocks';

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

  it('should have a p-table', () => {
    const el = fixture.debugElement.query(By.css('p-table'));
    expect(el).not.toBeNull();
  });

  it('should have a p-confirmDialog', () => {
    const el = fixture.debugElement.query(By.css('p-confirmDialog'));
    expect(el).not.toBeNull();
  });

  it('should have a new-site-btn', () => {
    const el = fixture.debugElement.query(By.css('#new-site-btn'));
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
    spyOn(sitesService, 'getAll').and.callThrough();
    (<any>component).getData();
    fixture.detectChanges();
    expect(sitesService.getAll).toHaveBeenCalled();
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
    component.confirmDelete(sites[0]);
    expect(confirmationService.confirm).toHaveBeenCalled();
  });

  it('when confirmDelete should service delete', () => {
    const site = sites[0];
    spyOn(sitesService, 'delete').and.callThrough();
    spyOn(confirmationService, 'confirm').and.callFake((confirmation: Confirmation) => {
      confirmation.accept();
    });
    component.confirmDelete(site);
    fixture.detectChanges();
    expect(sitesService.delete).toHaveBeenCalledWith(site.id);
  });

  it('when confirmDelete should call getData()', () => {
    const site = sites[0];
    spyOn((<any>component), 'getData');
    spyOn(confirmationService, 'confirm').and.callFake((confirmation: Confirmation) => {
      confirmation.accept();
    });
    component.confirmDelete(site);
    fixture.detectChanges();
    expect((<any>component).getData).toHaveBeenCalled();
  });
});
