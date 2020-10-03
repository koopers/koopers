import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CheckboxModule } from 'primeng/checkbox';
import { FormUserComponent } from './form-user.component';
import { UsersService } from '@core/services/users/users.service';
import { UsersServiceStub, AlertsServiceStub, LocationStub } from '@utils/stubs/stubs';
import { AlertsService } from '@core/services/alerts/alerts.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('FormUserComponent', () => {
  let component: FormUserComponent;
  let fixture: ComponentFixture<FormUserComponent>;
  let usersService, location, activatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormUserComponent ],
      providers: [
        {provide: UsersService, useClass: UsersServiceStub},
        {provide: AlertsService, useClass: AlertsServiceStub},
        {provide: Location, useClass: LocationStub},
        {provide: ActivatedRoute, useValue: {
          params: of({})
        }}
      ],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'users/new',
            component: FormUserComponent
          },
          {
            path: 'users/:id',
            component: FormUserComponent
          }
        ]),
        ReactiveFormsModule,
        FormsModule,
        InputSwitchModule,
        CheckboxModule
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUserComponent);
    component = fixture.componentInstance;
    usersService = TestBed.inject(UsersService);
    location = TestBed.inject(Location);
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    fixture.detectChanges();
  });

  afterAll(() => {
    usersService = null;
    location = null;
    activatedRoute = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
