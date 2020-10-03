import { TestBed } from '@angular/core/testing';

import { ManteinerGuard } from './manteiner.guard';
import { AuthService } from '@core/services/auth/auth.service';
import { AuthServiceStub } from '@utils/stubs/stubs';
import { RouterTestingModule } from '@angular/router/testing';

describe('ManteinerGuard', () => {
  let guard: ManteinerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AuthService, useClass: AuthServiceStub}
      ],
      imports: [
        RouterTestingModule
      ]
    });
    guard = TestBed.inject(ManteinerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
