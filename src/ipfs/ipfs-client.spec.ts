import {Test, TestingModule} from '@nestjs/testing';
import {IpfsClient} from './ipfs-client';

describe('IpfsClient', () => {
    let service: IpfsClient;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [IpfsClient],
        }).compile();

        service = module.get<IpfsClient>(IpfsClient);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
