import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUsersComponent } from './dashboard-users.component';
import { ConfirmationService } from 'primeng/api';
import { UsersService } from '@core/services/users/users.service';
import { UsersServiceStub, AlertsServiceStub } from '@utils/stubs/stubs';
import { AlertsService } from '@core/services/alerts/alerts.service';
import { TableModule } from 'primeng/table';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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
});
