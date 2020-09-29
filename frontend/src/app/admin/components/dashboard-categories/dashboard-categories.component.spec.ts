import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableModule } from 'primeng/table';
import {CategoriesService} from '@core/services/categories/categories.service';
import { AlertsService } from '@core/services/alerts/alerts.service';
import { DashboardCategoriesComponent } from './dashboard-categories.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ConfirmationService, Confirmation } from 'primeng/api';
import {CategoriesServiceStub, AlertsServiceStub} from '@utils/stubs/stubs';
import {categories} from '@utils/mocks/mocks';

describe('DashboardCategoriesComponent', () => {
  let component: DashboardCategoriesComponent;
  let fixture: ComponentFixture<DashboardCategoriesComponent>;
  let categoriesService, confirmationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCategoriesComponent ],
      providers: [
        ConfirmationService,
        {provide: CategoriesService, useClass: CategoriesServiceStub},
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
    fixture = TestBed.createComponent(DashboardCategoriesComponent);
    component = fixture.componentInstance;
    categoriesService = TestBed.inject(CategoriesService);
    confirmationService = fixture.debugElement.injector.get(ConfirmationService);
    fixture.detectChanges();
  });

  afterAll(() => {
    categoriesService = null;
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

  it('should have a new-category-btn', () => {
    const el = fixture.debugElement.query(By.css('#new-category-btn'));
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
    spyOn(categoriesService, 'getAll').and.callThrough();
    (<any>component).getData();
    fixture.detectChanges();
    expect(categoriesService.getAll).toHaveBeenCalled();
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
    component.confirmDelete(categories[0]);
    expect(confirmationService.confirm).toHaveBeenCalled();
  });

  it('when confirmDelete should service delete', () => {
    const category = categories[0];
    spyOn(categoriesService, 'delete').and.callThrough();
    spyOn(confirmationService, 'confirm').and.callFake((confirmation: Confirmation) => {
      confirmation.accept();
    });
    component.confirmDelete(category);
    fixture.detectChanges();
    expect(categoriesService.delete).toHaveBeenCalledWith(category.id);
  });

  it('when confirmDelete should call getData()', () => {
    const category = categories[0];
    spyOn((<any>component), 'getData');
    spyOn(confirmationService, 'confirm').and.callFake((confirmation: Confirmation) => {
      confirmation.accept();
    });
    component.confirmDelete(category);
    fixture.detectChanges();
    expect((<any>component).getData).toHaveBeenCalled();
  });


});
