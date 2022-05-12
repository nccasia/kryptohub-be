import {TerminusModule} from '@nestjs/terminus';
import {AuthModule} from './auth/auth.module';
import {DatabaseModule} from './database/database.module';
import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {IpfsModule} from './ipfs/ipfs.module';
import {ReadModule} from './meta/read/read.module';
import {ReadController} from './meta/read/read.controller';
import {UploadModule} from './meta/upload/upload.module';
import {UploadController} from './meta/upload/upload.controller';
import {MetaModule} from './meta/meta.module';
import {TokenModule} from './token/token.module';
import {SubsgraphModule} from './subsgraph/subsgraph.module';
import {S3fsModule} from './s3fs/s3fs.module';
import {ConfigModule} from '@nestjs/config';
import {AppService} from './app.service';
import {MetadiscsModule} from './metadiscs/metadiscs.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TerminusModule,
        DatabaseModule,
        IpfsModule,
        ReadModule,
        UploadModule,
        MetaModule,
        TokenModule,
        SubsgraphModule,
        S3fsModule,
        MetadiscsModule,
        AuthModule,
    ],
    controllers: [AppController, ReadController, UploadController],
    providers: [AppService],
})
export class AppModule {}
