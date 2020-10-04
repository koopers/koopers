import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '@core/services/auth/auth.service';
import { AuthServiceStub, LocationStub, AlertsServiceStub } from '@utils/stubs/stubs';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { throwError } from 'rxjs';
import { AlertsService } from '@core/services/alerts/alerts.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let location, authService, alertsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        {provide: AuthService, useClass: AuthServiceStub},
        {provide: Location, useClass: LocationStub},
        {provide: AlertsService, useClass: AlertsServiceStub},
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
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
    expect(el.nativeElement.textContent.trim()).toBe('Login');
  });

  it('should have a email input', () => {
    const el = fixture.debugElement.query(By.css('#email'));
    expect(el).not.toBeNull();
  });

  it('should have a password input', () => {
    const el = fixture.debugElement.query(By.css('#password'));
    expect(el).not.toBeNull();
  });

  it('should have a cancel btn', () => {
    const el = fixture.debugElement.query(By.css('#cancel-btn'));
    expect(el).not.toBeNull();
  });

  it('should have a login btn', () => {
    const el = fixture.debugElement.query(By.css('#login-btn'));
    expect(el).not.toBeNull();
  });

  it('should have form', () => {
    expect(Object.keys(component.form.controls)).toEqual(['email', 'password']);
  });

  it('should have invalid form', () => {
    expect(component.form.valid).toEqual(false);
  });

  it('when login should not call service login', () => {
    spyOn(authService, 'login').and.callThrough();
    const e = jasmine.createSpyObj('e', [ 'preventDefault' ]);
    component.login(e);
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

    it('when login should preventDefault', () => {
      spyOn(authService, 'login').and.callThrough();
      const e = jasmine.createSpyObj('e', [ 'preventDefault' ]);
      component.login(e);
      fixture.detectChanges();
      expect(e.preventDefault).toHaveBeenCalled();
    });

    it('when login should call service login', () => {
      spyOn(authService, 'login').and.callThrough();
      const e = jasmine.createSpyObj('e', [ 'preventDefault' ]);
      const user = {
        username: component.form.value.email,
        password: component.form.value.password,
      };
      component.login(e);
      fixture.detectChanges();
      expect(authService.login).toHaveBeenCalledWith(user);
    });

    it('when login should call service login and return error 1', (done) => {
      const message = 'Por favor revise el correo y la contraseña e intentelo de nuevo.';
      spyOn(authService, 'login').and.returnValue(throwError(null));
      spyOn(alertsService, 'handleErrorAlert');
      const e = jasmine.createSpyObj('e', [ 'preventDefault' ]);
      component.login(e);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(alertsService.handleErrorAlert).toHaveBeenCalledWith(message);
        done();
      });
    });

    it('when login should call service login and return error 2', (done) => {
      const message = 'Por favor revise el correo y la contraseña e intentelo de nuevo.';
      spyOn(authService, 'login').and.returnValue(throwError({error: 404}));
      spyOn(alertsService, 'handleErrorAlert');
      const e = jasmine.createSpyObj('e', [ 'preventDefault' ]);
      component.login(e);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(alertsService.handleErrorAlert).toHaveBeenCalledWith(message);
        done();
      });
    });

    it('when login should call service login and return error 3', (done) => {
      const message = 'testing error';
      spyOn(authService, 'login').and.returnValue(throwError({error: { detail: message}}));
      spyOn(alertsService, 'handleErrorAlert');
      const e = jasmine.createSpyObj('e', [ 'preventDefault' ]);
      component.login(e);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(alertsService.handleErrorAlert).toHaveBeenCalledWith(message);
        done();
      });
    });

  });

});
