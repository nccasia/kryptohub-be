import {Module} from '@nestjs/common';
import {IpfsModule} from '../../ipfs/ipfs.module';
import {IpfsClient} from '../../ipfs/ipfs-client';
import {ReadController} from './read.controller';
import {IpfsDownloader} from '../../ipfs/ipfs-downloader';

@Module({
    imports: [IpfsModule],
    controllers: [ReadController],
    providers: [IpfsClient, IpfsDownloader],
})
export class ReadModule {}
