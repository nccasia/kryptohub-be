import { Test, TestingModule } from '@nestjs/testing';
import { LoginRegistrationService } from './login-registration.service';

describe('LoginRegistrationService', () => {
  let service: LoginRegistrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginRegistrationService],
    }).compile();

    service = module.get<LoginRegistrationService>(LoginRegistrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
