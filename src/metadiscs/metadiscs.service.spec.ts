import {Test, TestingModule} from '@nestjs/testing';
import {TypeOrmModule} from '@nestjs/typeorm';
import {MetadiscsRepository} from './metadiscs.repository';
import {MetadiscsService} from './metadiscs.service';

describe('MetadiscsService', () => {
    let service: MetadiscsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [TypeOrmModule.forFeature([MetadiscsRepository])],
            providers: [MetadiscsService],
        }).compile();

        service = module.get<MetadiscsService>(MetadiscsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
