import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should saveToken setItem in sessionStorage', () => {
    spyOn(sessionStorage, 'setItem');
    const token = 'TOKEN';
    service.saveToken(token);
    expect(sessionStorage.setItem).toHaveBeenCalledWith('token', token);
  });

  it('should saveRefreshToken setItem in sessionStorage', () => {
    spyOn(sessionStorage, 'setItem');
    const token = 'TOKEN';
    service.saveRefreshToken(token);
    expect(sessionStorage.setItem).toHaveBeenCalledWith('token-refresh', token);
  });

  it('should getToken getItem in sessionStorage', () => {
    spyOn(sessionStorage, 'getItem');
    service.getToken();
    expect(sessionStorage.getItem).toHaveBeenCalledWith('token');
  });

  it('should getRefreshToken getItem in sessionStorage', () => {
    spyOn(sessionStorage, 'getItem');
    service.getRefreshToken();
    expect(sessionStorage.getItem).toHaveBeenCalledWith('token-refresh');
  });

  it('should deleteTokens clear sessionStorage', () => {
    spyOn(sessionStorage, 'clear');
    service.deleteTokens();
    expect(sessionStorage.clear).toHaveBeenCalled();
  });
});
