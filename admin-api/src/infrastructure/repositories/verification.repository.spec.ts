import { Test, TestingModule } from '@nestjs/testing';
import { VerificationRepository } from './verification.repository';
import { HttpModule } from '@nestjs/axios';

describe('VerificationRepository', () => {
  let provider: VerificationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [VerificationRepository],
    }).compile();

    provider = module.get<VerificationRepository>(VerificationRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
