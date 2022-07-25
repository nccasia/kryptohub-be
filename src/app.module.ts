import {TerminusModule} from '@nestjs/terminus';
import {AuthModule} from './auth/auth.module';
import {DatabaseModule} from './database/database.module';
import {ClassSerializerInterceptor, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {IpfsModule} from './ipfs/ipfs.module';
import {SubsgraphModule} from './subsgraph/subsgraph.module';
import {S3fsModule} from './s3fs/s3fs.module';
import {ConfigModule} from '@nestjs/config';
import {AppService} from './app.service';
import {SkillModule} from './skills/skills.module';
import {TokenModule} from './token/token.module';
import {TeamModule} from './team/team.module';
import {MulterModule} from '@nestjs/platform-express';
import {SkillDistributionModule} from './skill-distribution/skill-distribution.module';
import {MembersModule} from './members/members.module';
import {EmailModule} from './email/email.module';
import {PortfolioModule} from './portfolio/portfolio.module';
import {AwardsModule} from './awards/awards.module';
import {KeyClientModule} from './key-clients/key-clients.module';
import {APP_INTERCEPTOR} from '@nestjs/core';
import { ServiceLineModule } from './services-line/service-line.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterModule.register({
      dest: './files',
    }),
    TerminusModule,
    DatabaseModule,
    IpfsModule,
    TokenModule,
    SubsgraphModule,
    S3fsModule,
    AuthModule,
    SkillModule,
    TeamModule,
    SkillDistributionModule,
    MembersModule,
    EmailModule,
    PortfolioModule,
    KeyClientModule,
    AwardsModule,
    ServiceLineModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}

