import { Test, TestingModule } from '@nestjs/testing';
import { MetadiscsController } from './metadiscs.controller';
import { MetadiscsService } from './metadiscs.service';

describe('MetadiscsController', () => {
  let controller: MetadiscsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetadiscsController],
      providers: [MetadiscsService],
    }).compile();

    controller = module.get<MetadiscsController>(MetadiscsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
