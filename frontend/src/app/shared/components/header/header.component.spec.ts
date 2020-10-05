import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AuthService } from '@core/services/auth/auth.service';
import { AuthServiceStub } from '@utils/stubs/stubs';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService, router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        {provide: AuthService, useClass: AuthServiceStub}
      ],
      imports: [
        RouterTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  afterAll(() => {
    authService = null;
    router = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init manteiner in false', () => {
    expect(component.manteiner).toBeFalse();
  });

  it('should init visible in false', () => {
    expect(component.visible).toBeUndefined();
  });

  it('changePage should change visible', () => {
    component.changePage('/');
    expect(component.visible).toBeFalse();
  });

  it('changePage should change route', () => {
    spyOn(router, 'navigate').and.callThrough();
    component.changePage('/');
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should service call getUser', () => {
    spyOn(authService, 'getUser').and.callThrough();
    component.ngOnInit();
    expect(authService.getUser).toHaveBeenCalled();
  });

  it('getUser is admin should change manteiner to true', () => {
    spyOn(authService, 'getUser').and.returnValue(of({admin: true}));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.manteiner).toBeTrue();
  });

  it('getUser is admin should change manteiner to true', () => {
    spyOn(authService, 'getUser').and.returnValue(of({admin: false}));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.manteiner).toBeFalse();
  });

  it('logout should call service logout', () => {
    spyOn(authService, 'logout');
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });
});
