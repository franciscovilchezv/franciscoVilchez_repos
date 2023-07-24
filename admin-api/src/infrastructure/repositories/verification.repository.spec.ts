import { Test, TestingModule } from '@nestjs/testing';
import { VerificationRepository } from './verification.repository';

describe('VerificationRepository', () => {
  let provider: VerificationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerificationRepository],
    }).compile();

    provider = module.get<VerificationRepository>(VerificationRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
