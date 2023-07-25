import { Test, TestingModule } from '@nestjs/testing';
import { RepositoriesModule } from '../src/infrastructure/repositories/repositories.module';
import { UtilsModule } from '../src/utils/utils.module';
import { ExceptionsModule } from '../src/infrastructure/exceptions/exceptions.module';
import { TribeRepository } from '../src/infrastructure/repositories/tribe.repository';
import { ExceptionsService } from '../src/infrastructure/exceptions/exceptions.service';
import { VerboseService } from '../src/utils/verbose/verbose.service';
import { ReadMetricTribeUsescases } from '../src/usescases/tribe/read-metric.tribe.usescases';
import { VerificationRepository } from '../src/infrastructure/repositories/verification.repository';
import { VERIFICATION_VALUES } from '../src/domain/model/verification/verification.constant';
import { TRIBE_REPOSITORY_STATE } from '../src/domain/model/tribe/tribe-repository.constant';

describe('ReadMetricTribeUsescases', () => {
  let provider: ReadMetricTribeUsescases;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ExceptionsModule, UtilsModule, RepositoriesModule],
      providers: [],
    }).compile();

    const tribeRepository = module.get<TribeRepository>(TribeRepository);
    const verificationRepository = module.get<VerificationRepository>(
      VerificationRepository,
    );
    const exceptionService = module.get<ExceptionsService>(ExceptionsService);
    const verboseService = module.get<VerboseService>(VerboseService);

    provider = new ReadMetricTribeUsescases(
      tribeRepository,
      verificationRepository,
      exceptionService,
      verboseService,
    );
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should return metrics with valid date, state and coverage', async () => {
    const res = await provider.execute(1);

    expect(res).toStrictEqual({
      repositories: expect.arrayContaining([
        {
          id: BigInt(1),
          name: 'Repo 1_1',
          tribe: 'Tribe 1',
          organization: 'Organization 1',
          coverage: '76%',
          codeSmells: 11,
          bugs: 2,
          vulnerabilities: 15,
          hotspots: 1,
          verificationState: VERIFICATION_VALUES[604],
          state: TRIBE_REPOSITORY_STATE.E,
        },
        {
          id: BigInt(2),
          name: 'Repo 2_1',
          tribe: 'Tribe 1',
          organization: 'Organization 1',
          coverage: '77%',
          codeSmells: 11,
          bugs: 2,
          vulnerabilities: 15,
          hotspots: 1,
          verificationState: VERIFICATION_VALUES[605],
          state: TRIBE_REPOSITORY_STATE.E,
        },
      ]),
    });
    expect(res.repositories).toHaveLength(2);
  });
});
