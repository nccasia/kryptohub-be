import {TerminusModule} from '@nestjs/terminus';
import {AuthModule} from './auth/auth.module';
import {DatabaseModule} from './database/database.module';
import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {IpfsModule} from './ipfs/ipfs.module';
import {SubsgraphModule} from './subsgraph/subsgraph.module';
import {S3fsModule} from './s3fs/s3fs.module';
import {ConfigModule} from '@nestjs/config';
import {AppService} from './app.service';
import {SkillModule} from './skill/skill.module';
import {TokenModule} from './token/token.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TerminusModule,
        DatabaseModule,
        IpfsModule,
        TokenModule,
        SubsgraphModule,
        S3fsModule,
        AuthModule,
        SkillModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
