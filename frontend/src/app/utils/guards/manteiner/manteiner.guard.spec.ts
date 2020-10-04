import { TestBed } from '@angular/core/testing';

import { ManteinerGuard } from './manteiner.guard';
import { AuthService } from '@core/services/auth/auth.service';
import { AuthServiceStub } from '@utils/stubs/stubs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('ManteinerGuard', () => {
  let guard: ManteinerGuard;
  let authService: AuthService;
  let routeMock: any = { snapshot: {}};
  let routeStateMock: any = { snapshot: {}, url: '/cookies'};
  let routerMock = {navigate: jasmine.createSpy('navigate')}

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AuthService, useClass: AuthServiceStub},
        { provide: Router, useValue: routerMock }
      ],
      imports: [
        RouterTestingModule
      ]
    });
    guard = TestBed.inject(ManteinerGuard);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect an unauthenticated user to the login route', () => {
    spyOn(authService, 'getUser').and.returnValue(of({admin: false}));
    guard.canActivate(routeMock, routeStateMock);
    expect(routerMock.navigate).not.toHaveBeenCalledWith(['/admin/sites']);
  });
});
