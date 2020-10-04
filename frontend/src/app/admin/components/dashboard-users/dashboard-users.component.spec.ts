import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUsersComponent } from './dashboard-users.component';
import { ConfirmationService, Confirmation } from 'primeng/api';
import { UsersService } from '@core/services/users/users.service';
import { UsersServiceStub, AlertsServiceStub } from '@utils/stubs/stubs';
import { AlertsService } from '@core/services/alerts/alerts.service';
import { TableModule } from 'primeng/table';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { users } from '@utils/mocks/mocks';

describe('DashboardUsersComponent', () => {
  let component: DashboardUsersComponent;
  let fixture: ComponentFixture<DashboardUsersComponent>;
  let usersService, confirmationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardUsersComponent ],
      providers: [
        ConfirmationService,
        {provide: UsersService, useClass: UsersServiceStub},
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
    fixture = TestBed.createComponent(DashboardUsersComponent);
    component = fixture.componentInstance;
    usersService = TestBed.inject(UsersService);
    confirmationService = fixture.debugElement.injector.get(ConfirmationService);
    fixture.detectChanges();
  });

  afterAll(() => {
    usersService = null;
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

  it('should have a new-user-btn', () => {
    const el = fixture.debugElement.query(By.css('#new-user-btn'));
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
    spyOn(usersService, 'getAll').and.callThrough();
    (<any>component).getData();
    fixture.detectChanges();
    expect(usersService.getAll).toHaveBeenCalled();
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
    component.confirmDelete(users[0]);
    expect(confirmationService.confirm).toHaveBeenCalled();
  });

  it('when confirmDelete should service delete', () => {
    const user = users[0];
    spyOn(usersService, 'delete').and.callThrough();
    spyOn(confirmationService, 'confirm').and.callFake((confirmation: Confirmation) => {
      confirmation.accept();
    });
    component.confirmDelete(user);
    fixture.detectChanges();
    expect(usersService.delete).toHaveBeenCalledWith(user.id);
  });

  it('when confirmDelete should call getData()', () => {
    const user = users[0];
    spyOn((<any>component), 'getData');
    spyOn(confirmationService, 'confirm').and.callFake((confirmation: Confirmation) => {
      confirmation.accept();
    });
    component.confirmDelete(user);
    fixture.detectChanges();
    expect((<any>component).getData).toHaveBeenCalled();
  });

});
