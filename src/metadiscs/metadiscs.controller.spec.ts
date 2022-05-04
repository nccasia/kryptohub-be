import {Test, TestingModule} from '@nestjs/testing';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DatabaseModule} from '../database/database.module';
import {MetadiscsController} from './metadiscs.controller';
import {MetadiscsRepository} from './metadiscs.repository';
import {MetadiscsService} from './metadiscs.service';

describe('MetadiscsController', () => {
    let controller: MetadiscsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                DatabaseModule,
                TypeOrmModule.forFeature([MetadiscsRepository]),
            ],
            controllers: [MetadiscsController],
            providers: [MetadiscsService],
        }).compile();

        controller = module.get<MetadiscsController>(MetadiscsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
