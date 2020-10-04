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
import { By } from '@angular/platform-browser';
import { users } from '@utils/mocks/mocks';

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

  it('should have a title', () => {
    const el = fixture.debugElement.query(By.css('#title-header'));
    expect(el).not.toBeNull();
  });

  it('should have text title', () => {
    const el = fixture.debugElement.query(By.css('#title-header'));
    expect(el.nativeElement.textContent.trim()).toBe('Nuevo Usuario');
  });

  it('should have a username input', () => {
    const el = fixture.debugElement.query(By.css('#username'));
    expect(el).not.toBeNull();
  });

  it('should have a password input', () => {
    const el = fixture.debugElement.query(By.css('#password'));
    expect(el).not.toBeNull();
  });

  it('should have a is_staff input', () => {
    const el = fixture.debugElement.query(By.css('#is_staff'));
    expect(el).not.toBeNull();
  });

  it('should not have a updatePassword input', () => {
    const el = fixture.debugElement.query(By.css('#updatePassword'));
    expect(el).toBeNull();
  });

  it('should have a cancel btn', () => {
    const el = fixture.debugElement.query(By.css('#cancel-btn'));
    expect(el).not.toBeNull();
  });

  it('should have a save btn', () => {
    const el = fixture.debugElement.query(By.css('#save-btn'));
    expect(el).not.toBeNull();
  });

  it('should have userForm', () => {
    expect(Object.keys(component.userForm.controls)).toEqual(['username', 'is_staff', 'password']);
  });

  it('should remove password field', () => {
    expect(Object.keys(component.userForm.controls)).toEqual(['username', 'is_staff', 'password']);
    component.addPasswordField(false);
    expect(Object.keys(component.userForm.controls)).toEqual(['username', 'is_staff']);
  });

  it('should not have currentUser', () => {
    expect(component.currentUser).toBeUndefined();
  });

  it('when onSave should call create', () => {
    spyOn(usersService, 'create').and.callThrough();
    component.onSave();
    expect(usersService.create).toHaveBeenCalledWith(
      component.userForm.value
    );
  });

  it('when goBack should location back', () => {
    spyOn(location, 'back');
    component.goBack();
    expect(location.back).toHaveBeenCalled();
  });

  it('when router has id should call getOne', () => {
    spyOn(usersService, 'getOne').and.callThrough();
    activatedRoute.params = of({id: 3});
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(usersService.getOne).toHaveBeenCalledWith(3);
    });
  });

  it('when getOne returns should call set current category', () => {
    spyOn(usersService, 'getOne').and.returnValue(of(users[0]));
    activatedRoute.params = of({id: 3});
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.currentUser).toEqual(users[0]);
  });

  describe('when have a currentUser', () => {
    beforeEach(() => {
      component.currentUser = users[0];
      fixture.detectChanges();
    });

    it('should have text title', () => {
      const el = fixture.debugElement.query(By.css('#title-header'));
      expect(el.nativeElement.textContent.trim()).toBe('Editar Usuario');
    });

    it('should have currentUser', () => {
      expect(component.currentUser).not.toBeUndefined();
    });

    it('when onSave should call update', () => {
      spyOn(usersService, 'update').and.callThrough();
      component.onSave();
      expect(usersService.update).toHaveBeenCalledWith(
        users[0].id,
        component.userForm.value
      );
    });
  });
});
