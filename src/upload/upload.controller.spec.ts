import {Test, TestingModule} from '@nestjs/testing';
import {UploadController} from './upload.controller';
import {IpfsClient} from '../ipfs/ipfs-client';
import {IpfsUploader} from './ipfs-uploader';
import {IpfsModule} from '../ipfs/ipfs.module';

describe('UploadController', () => {
    let controller: UploadController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UploadController],
            providers: [IpfsClient, IpfsUploader],
            imports: [IpfsModule],
        }).compile();

        controller = module.get<UploadController>(UploadController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
