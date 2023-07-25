import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationRepository } from './organization.repository';
import { PrismaModule } from '../config/prisma/prisma.module';

describe('OrganizationRepository', () => {
  let provider: OrganizationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [OrganizationRepository],
    }).compile();

    provider = module.get<OrganizationRepository>(OrganizationRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
