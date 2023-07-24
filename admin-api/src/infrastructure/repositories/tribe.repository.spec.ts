import { Test, TestingModule } from '@nestjs/testing';
import { TribeRepository } from './tribe.repository';

describe('TribeRepository', () => {
  let provider: TribeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TribeRepository],
    }).compile();

    provider = module.get<TribeRepository>(TribeRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
