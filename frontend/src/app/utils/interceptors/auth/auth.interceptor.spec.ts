import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from '@core/services/auth/auth.service';
import { AuthServiceStub, TokenServiceStub } from '@utils/stubs/stubs';
import { RouterTestingModule } from '@angular/router/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoriesService } from '@core/services/categories/categories.service';
import { TokenService } from '@core/services/token/token.service';

describe('AuthInterceptor', () => {
  let service: CategoriesService;
  let authService: AuthService;
  let tokenService: TokenService;
  let httpMock: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthInterceptor,
      AuthService,
      CategoriesService,
      {provide: TokenService, useClass: TokenServiceStub},
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
      },
    ],
    imports: [
      HttpClientTestingModule,
      RouterTestingModule
    ]
  }));

  beforeEach(() => {
    service = TestBed.inject(CategoriesService);
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should not add an Authorization header', () => {
    service.getAll().subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(`${environment.url_api}/categories/`);
    expect(httpRequest.request.headers.has('Authorization')).toEqual(false);
  });

  it('should not add an Authorization header (refresh)', () => {
    authService.refreshToken().subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(`${environment.url_api}/auth/signin/refresh/`);
    expect(httpRequest.request.headers.has('Authorization')).toEqual(false);
  });

  it('should add an Authorization header', () => {
    spyOn(tokenService, 'getToken').and.returnValue('TOKEN');
    service.getAll().subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(`${environment.url_api}/categories/`);
    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
  });

  it('should not add an Authorization header (refresh)', () => {
    spyOn(tokenService, 'getRefreshToken').and.returnValue('TOKEN');
    authService.refreshToken().subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(`${environment.url_api}/auth/signin/refresh/`);
    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
  });

});
