import {Module} from '@nestjs/common';
import {UploadController} from './upload.controller';
import {IpfsModule} from '../ipfs/ipfs.module';
import {IpfsClient} from '../ipfs/ipfs-client';
import {IpfsUploader} from './ipfs-uploader';

@Module({
    controllers: [UploadController],
    providers: [IpfsClient, IpfsUploader],
    imports: [IpfsModule],
})
export class UploadModule {}
