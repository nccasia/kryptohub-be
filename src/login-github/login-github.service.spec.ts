import { Test, TestingModule } from '@nestjs/testing';
import { LoginGithubService } from './login-github.service';

describe('LoginGithubService', () => {
  let service: LoginGithubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginGithubService],
    }).compile();

    service = module.get<LoginGithubService>(LoginGithubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
