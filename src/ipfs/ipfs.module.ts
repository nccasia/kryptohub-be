import {Module} from '@nestjs/common';
import {IpfsClient} from './ipfs-client';
import {IpfsDownloader} from './ipfs-downloader';
import {IpfsUploader} from './ipfs-uploader';

@Module({
    providers: [IpfsClient, IpfsDownloader, IpfsUploader],
    exports: [IpfsDownloader, IpfsUploader],
})
export class IpfsModule {}
