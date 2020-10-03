import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { RegisterComponent } from './register.component';
import { AuthService } from '@core/services/auth/auth.service';
import { AlertsService } from '@core/services/alerts/alerts.service';
import { AlertsServiceStub, LocationStub, AuthServiceStub } from '@utils/stubs/stubs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { InputSwitchModule } from 'primeng/inputswitch';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      providers: [
        {provide: AuthService, useClass: AuthServiceStub},
        {provide: AlertsService, useClass: AlertsServiceStub},
        {provide: Location, useClass: LocationStub},
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        InputSwitchModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
