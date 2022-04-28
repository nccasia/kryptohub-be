import { Test, TestingModule } from '@nestjs/testing';
import { MetadiscsService } from './metadiscs.service';

describe('MetadiscsService', () => {
  let service: MetadiscsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetadiscsService],
    }).compile();

    service = module.get<MetadiscsService>(MetadiscsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
