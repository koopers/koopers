import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from '@core/services/auth/auth.service';
import { AuthServiceStub } from '@utils/stubs/stubs';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthInterceptor,
      {provide: AuthService, useClass: AuthServiceStub}
    ],
    imports: [
      RouterTestingModule
    ]
  }));

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
