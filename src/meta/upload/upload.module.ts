import {Module} from '@nestjs/common';
import {UploadController} from './upload.controller';
import {IpfsModule} from '../../ipfs/ipfs.module';
import {IpfsClient} from '../../ipfs/ipfs-client';
import {IpfsUploader} from '../../ipfs/ipfs-uploader';

@Module({
    imports: [IpfsModule],
    controllers: [UploadController],
    providers: [IpfsClient, IpfsUploader],
})
export class UploadModule {}
