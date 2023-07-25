import { Test, TestingModule } from '@nestjs/testing';
import { TribeRepository } from './tribe.repository';
import { PrismaModule } from '../config/prisma/prisma.module';
import { ExceptionsModule } from '../exceptions/exceptions.module';

describe('TribeRepository', () => {
  let provider: TribeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ExceptionsModule],
      providers: [TribeRepository],
    }).compile();

    provider = module.get<TribeRepository>(TribeRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
