import {Test, TestingModule} from '@nestjs/testing';
import {ReadController} from './read.controller';
import {IpfsClient} from '../../ipfs/ipfs-client';
import {IpfsModule} from '../../ipfs/ipfs.module';
import {IpfsDownloader} from '../../ipfs/ipfs-downloader';

describe('ReadController', () => {
    let controller: ReadController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ReadController],
            providers: [IpfsClient, IpfsDownloader],
            imports: [IpfsModule],
        }).compile();

        controller = module.get<ReadController>(ReadController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
