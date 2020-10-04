import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSuggestedSitesComponent } from './dashboard-suggested-sites.component';
import { SuggestedSitesService } from '@core/services/suggested-sites/suggested-sites.service';
import { SuggestedSitesServiceStub, AlertsServiceStub } from '@utils/stubs/stubs';
import { ConfirmationService, Confirmation } from 'primeng/api';
import { AlertsService } from '@core/services/alerts/alerts.service';
import { TableModule } from 'primeng/table';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { suggestedSites } from '@utils/mocks/mocks';

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

  it('should have a p-table', () => {
    const el = fixture.debugElement.query(By.css('p-table'));
    expect(el).not.toBeNull();
  });

  it('should have a p-confirmDialog', () => {
    const el = fixture.debugElement.query(By.css('p-confirmDialog'));
    expect(el).not.toBeNull();
  });

  it('should not have a new-suggested-site-btn', () => {
    const el = fixture.debugElement.query(By.css('#new-suggested-site-btn'));
    expect(el).toBeNull();
  });

  it('should have a edit-btn', () => {
    const el = fixture.debugElement.query(By.css('.edit-btn'));
    expect(el).not.toBeNull();
  });

  it('should have a delete-btn', () => {
    const el = fixture.debugElement.query(By.css('.delete-btn'));
    expect(el).not.toBeNull();
  });

  it('should parse categoryLabels', () => {
    const data = [
      "Category 1",
      "Category 2"
    ];
    const result = component.categoriesLabel(JSON.stringify(data));
    expect(result).toEqual(data.join(', '))
  });

  it('should return categories if fails to parse', () => {
    const data = 'Category 1, Category 2'
    const result = component.categoriesLabel(data);
    expect(result).toEqual(data);
  });

  it('when ngOnInit should call getData', () => {
    spyOn((<any>component), 'getData');
    component.ngOnInit();
    expect((<any>component).getData).toHaveBeenCalled();
  });

  it('when getData should call service getAll', () => {
    spyOn(suggestedSitesService, 'getAll').and.callThrough();
    (<any>component).getData();
    fixture.detectChanges();
    expect(suggestedSitesService.getAll).toHaveBeenCalled();
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
    component.confirmDelete(suggestedSites[0]);
    expect(confirmationService.confirm).toHaveBeenCalled();
  });

  it('when confirmDelete should service delete', () => {
    const suggestedSite = suggestedSites[0];
    spyOn(suggestedSitesService, 'delete').and.callThrough();
    spyOn(confirmationService, 'confirm').and.callFake((confirmation: Confirmation) => {
      confirmation.accept();
    });
    component.confirmDelete(suggestedSite);
    fixture.detectChanges();
    expect(suggestedSitesService.delete).toHaveBeenCalledWith(suggestedSite.id);
  });

  it('when confirmDelete should call getData()', () => {
    const suggestedSite = suggestedSites[0];
    spyOn((<any>component), 'getData');
    spyOn(confirmationService, 'confirm').and.callFake((confirmation: Confirmation) => {
      confirmation.accept();
    });
    component.confirmDelete(suggestedSite);
    fixture.detectChanges();
    expect((<any>component).getData).toHaveBeenCalled();
  });
});
