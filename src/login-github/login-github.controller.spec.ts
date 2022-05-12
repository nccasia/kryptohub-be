import { Test, TestingModule } from '@nestjs/testing';
import { LoginGithubController } from './login-github.controller';
import { LoginGithubService } from './login-github.service';

describe('LoginGithubController', () => {
  let controller: LoginGithubController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginGithubController],
      providers: [LoginGithubService],
    }).compile();

    controller = module.get<LoginGithubController>(LoginGithubController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
