import { Module } from '@nestjs/common';
import { LoginGithubService } from './login-github.service';
import { LoginGithubController } from './login-github.controller';
import { JwtAuthModule } from './jwt/jwt-auth.module';
import { UserModule } from '../user/user.module';
import { GithubOauthStrategy } from './strategies/login-github.strategy';

@Module({
  imports: [JwtAuthModule, UserModule],
  controllers: [LoginGithubController],
  providers: [LoginGithubService, GithubOauthStrategy]
})
export class LoginGithubModule {}
