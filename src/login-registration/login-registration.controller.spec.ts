import { Test, TestingModule } from '@nestjs/testing';
import { LoginRegistrationController } from './login-registration.controller';
import { LoginRegistrationService } from './login-registration.service';

describe('LoginRegistrationController', () => {
  let controller: LoginRegistrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginRegistrationController],
      providers: [LoginRegistrationService],
    }).compile();

    controller = module.get<LoginRegistrationController>(LoginRegistrationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
