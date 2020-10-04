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
import { By } from '@angular/platform-browser';
import { throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let location, authService, alertsService;

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
    location = TestBed.inject(Location);
    authService = TestBed.inject(AuthService);
    alertsService = TestBed.inject(AlertsService);
    fixture.detectChanges();
  });

  afterAll(() => {
    location = null;
    authService = null;
    alertsService = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have text title', () => {
    const el = fixture.debugElement.query(By.css('#title-header'));
    expect(el.nativeElement.textContent.trim()).toBe('Registro');
  });

  it('should have a email input', () => {
    const el = fixture.debugElement.query(By.css('#email'));
    expect(el).not.toBeNull();
  });

  it('should have a password input', () => {
    const el = fixture.debugElement.query(By.css('#password'));
    expect(el).not.toBeNull();
  });

  it('should have a isAdmin input', () => {
    const el = fixture.debugElement.query(By.css('#isAdmin'));
    expect(el).not.toBeNull();
  });

  it('should have a cancel btn', () => {
    const el = fixture.debugElement.query(By.css('#cancel-btn'));
    expect(el).not.toBeNull();
  });

  it('should have a register btn', () => {
    const el = fixture.debugElement.query(By.css('#register-btn'));
    expect(el).not.toBeNull();
  });

  it('should have form', () => {
    expect(Object.keys(component.form.controls)).toEqual(['email', 'password', 'isAdmin']);
  });

  it('should have invalid form', () => {
    expect(component.form.valid).toEqual(false);
  });

  it('when login should not call service login', () => {
    spyOn(authService, 'login').and.callThrough();
    const e = jasmine.createSpyObj('e', [ 'preventDefault' ]);
    component.register(e);
    fixture.detectChanges();
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('when goBack should location back', () => {
    spyOn(location, 'back');
    component.goBack();
    expect(location.back).toHaveBeenCalled();
  });

  describe('when valid form', () => {

    beforeEach(() => {
      component.form.patchValue({
        email: 'test@test.com',
        password: 'password123'
      });
      fixture.detectChanges();
    });

    it('should have valid form', () => {
      expect(component.form.valid).toEqual(true);
    });

    it('when register should preventDefault', () => {
      const e = jasmine.createSpyObj('e', [ 'preventDefault' ]);
      component.register(e);
      fixture.detectChanges();
      expect(e.preventDefault).toHaveBeenCalled();
    });

    it('when register should call service register', () => {
      spyOn(authService, 'register').and.callThrough();
      const e = jasmine.createSpyObj('e', [ 'preventDefault' ]);
      const user = {
        username: component.form.value.email,
        password: component.form.value.password,
        is_staff: component.form.value.isAdmin || false,
      };
      component.register(e);
      fixture.detectChanges();
      expect(authService.register).toHaveBeenCalledWith(user);
    });

    it('when register should call service register and return error 1', (done) => {
      const message = 'Testing..';
      spyOn(authService, 'register').and.returnValue(throwError({error: { username: [message]}}));
      spyOn(alertsService, 'handleErrorAlert');
      const e = jasmine.createSpyObj('e', [ 'preventDefault' ]);
      component.register(e);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(alertsService.handleErrorAlert).toHaveBeenCalledWith(message);
        done();
      });
    });

  });

});
