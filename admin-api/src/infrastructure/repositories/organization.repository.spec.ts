import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationRepository } from './organization.repository';

describe('OrganizationRepository', () => {
  let provider: OrganizationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationRepository],
    }).compile();

    provider = module.get<OrganizationRepository>(OrganizationRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
