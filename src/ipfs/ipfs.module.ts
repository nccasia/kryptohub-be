import {Module} from '@nestjs/common';
import {IpfsClient} from './ipfs-client';

@Module({
    providers: [IpfsClient],
})
export class IpfsModule {}
