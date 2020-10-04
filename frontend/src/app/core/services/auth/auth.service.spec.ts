import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { AuthService } from './auth.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { users } from '@utils/mocks/mocks';
import { cold } from 'jasmine-marbles';
import { TokenService } from '../token/token.service';
import { TokenServiceStub } from '@utils/stubs/stubs';

describe('AuthService', () => {
  let httpTestingController: HttpTestingController;
  let service: AuthService, tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: TokenService, useClass: TokenServiceStub }
      ],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
    tokenService = TestBed.inject(TokenService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  afterAll(() => {
    service = null;
    tokenService = null;
    httpTestingController = null;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getUser call get', () => {
    service.getUser().subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/auth/user/`);
    expect(req.request.method).toBe('GET');
  });

  it('should getUser use the right url', () => {
    service.getUser().subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/auth/user/`);
    expect(req.request.url).toBe(`${environment.url_api}/auth/user/`);
  });

  it('should register call post', () => {
    service.register(users[0]).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/auth/signup/`);
    expect(req.request.method).toBe('POST');
  });

  it('should register use the right url', () => {
    service.register(users[0]).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/auth/signup/`);
    expect(req.request.url).toBe(`${environment.url_api}/auth/signup/`);
  });

  it('should login call post', () => {
    service.login(users[0]).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/auth/signin/`);
    expect(req.request.method).toBe('POST');
  });

  it('should login use the right url', () => {
    service.login(users[0]).subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/auth/signin/`);
    expect(req.request.url).toBe(`${environment.url_api}/auth/signin/`);
  });

  it('should login return the tokens', () => {
    const mockData = { access: 'ACCESS_TOKEN', refresh: 'REFRESH_TOKEN' };
    service.login(users[0]).subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpTestingController.expectOne(`${environment.url_api}/auth/signin/`);
    req.flush(mockData);
  });

  it('should login save access token', () => {
    spyOn(tokenService, 'saveToken');
    const mockData = { access: 'ACCESS_TOKEN', refresh: 'REFRESH_TOKEN' };
    service.login(users[0]).subscribe(data => {
      expect(tokenService.saveToken).toHaveBeenCalledWith(data.access);
    });
    const req = httpTestingController.expectOne(`${environment.url_api}/auth/signin/`);
    req.flush(mockData);
  });

  it('should login save access token', () => {
    spyOn(tokenService, 'saveRefreshToken');
    const mockData = { access: 'ACCESS_TOKEN', refresh: 'REFRESH_TOKEN' };
    service.login(users[0]).subscribe(data => {
      expect(tokenService.saveRefreshToken).toHaveBeenCalledWith(data.refresh);
    });
    const req = httpTestingController.expectOne(`${environment.url_api}/auth/signin/`);
    req.flush(mockData);
  });

  it('should logout call tokenService deleteTokens', () => {
    spyOn(tokenService, 'deleteTokens');
    service.logout();
    expect(tokenService.deleteTokens).toHaveBeenCalled();
  });

  it('should refreshToken call post', () => {
    service.refreshToken().subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/auth/signin/refresh/`);
    expect(req.request.method).toBe('POST');
  });

  it('should refreshToken use the right url', () => {
    service.refreshToken().subscribe();
    const req = httpTestingController.expectOne(`${environment.url_api}/auth/signin/refresh/`);
    expect(req.request.url).toBe(`${environment.url_api}/auth/signin/refresh/`);
  });

  it('should login return the access token', () => {
    const mockData = { access: 'ACCESS_TOKEN' };
    service.refreshToken().subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpTestingController.expectOne(`${environment.url_api}/auth/signin/refresh/`);
    req.flush(mockData);
  });

  it('should login save the access token', () => {
    spyOn(tokenService, 'saveToken');
    const mockData = { access: 'ACCESS_TOKEN' };
    service.refreshToken().subscribe(data => {
      expect(tokenService.saveToken).toHaveBeenCalledWith(data.access);
    });
    const req = httpTestingController.expectOne(`${environment.url_api}/auth/signin/refresh/`);
    req.flush(mockData);
  });

  it('should handleError', () => {
    const mock404Error = {
      status: 404
    };
    const handleError$ = (<any>service).handleError(mock404Error);
    const expected$ = cold('#', undefined, mock404Error);
    expect(handleError$).toBeObservable(expected$);
  });
});
