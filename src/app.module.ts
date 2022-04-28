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
import {APP_PIPE} from '@nestjs/core';
import {ValidationPipe} from '@hovoh/nestjs-api-lib';
import {AppService} from './app.service';
import { MetadiscsModule } from './metadiscs/metadiscs.module';

@Module({
    imports: [
        IpfsModule,
        ReadModule,
        UploadModule,
        MetaModule,
        TokenModule,
        SubsgraphModule,
        S3fsModule,
        ConfigModule.forRoot(),
        MetadiscsModule,
    ],
    controllers: [AppController, ReadController, UploadController],
    providers: [
        {
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },
        AppService,
    ],
})
export class AppModule {}
