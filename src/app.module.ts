import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {IpfsModule} from './ipfs/ipfs.module';
import {ReadModule} from './read/read.module';
import {ReadController} from './read/read.controller';
import {IpfsClient} from './ipfs/ipfs-client';
import {UploadModule} from './upload/upload.module';
import {MulterModule} from '@nestjs/platform-express';
import {UploadController} from './upload/upload.controller';
import {IpfsDownloader} from './read/ipfs-downloader';
import {IpfsUploader} from './upload/ipfs-uploader';

@Module({
    imports: [MulterModule.register(), IpfsModule, ReadModule, UploadModule],
    controllers: [AppController, ReadController, UploadController],
    providers: [AppService, IpfsClient, IpfsDownloader, IpfsUploader],
})
export class AppModule {}
