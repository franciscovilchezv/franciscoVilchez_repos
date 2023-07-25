import { Test, TestingModule } from '@nestjs/testing';
import { VerboseService } from './verbose.service';

describe('VerboseService', () => {
  let service: VerboseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerboseService],
    }).compile();

    service = module.get<VerboseService>(VerboseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
