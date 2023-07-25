import { Test, TestingModule } from '@nestjs/testing';
import { ReadMetricTribeUsescases } from './read-metric.tribe.usescases';
import { ITribeRepository } from '../../domain/repositories/tribe.repository';
import { IVerificationRepository } from '../../domain/repositories/verification.repository';
import { ExceptionsModule } from '../../infrastructure/exceptions/exceptions.module';
import { ExceptionsService } from '../../infrastructure/exceptions/exceptions.service';
import { TribeMetricEntity } from '../../domain/model/tribe/tribe-metric.entity';
import {
  REPOSITORY_STATE,
  TRIBE_REPOSITORY_STATE,
} from '../../domain/model/tribe/tribe-repository.constant';
import { UtilsModule } from '../../utils/utils.module';
import { VERIFICATION_VALUES } from '../../domain/model/verification/verification.constant';
import { NotFoundException } from '@nestjs/common';
import { TribeMetricMapper } from '../../utils/mappers/tribe-metric.mapper';

describe('ReadMetricTribeUsescases', () => {
  let provider: ReadMetricTribeUsescases;

  const repo1 = {
    id_repository: BigInt(11),
    name: 'repo1_1',
    state: REPOSITORY_STATE.ENABLE,
    metrics: {
      coverage: 0.76,
      code_smells: 4,
      bugs: 4,
      vulnerabilities: 5,
      hotspot: 7,
    },
  };

  const repo2 = {
    id_repository: BigInt(12),
    name: 'repo1_2',
    state: REPOSITORY_STATE.ENABLE,
    metrics: {
      coverage: 0.77,
      code_smells: 4,
      bugs: 4,
      vulnerabilities: 5,
      hotspot: 7,
    },
  };

  const tribe1 = {
    id_tribe: BigInt(1),
    name: 'name1',
    organization: {
      name: 'org1',
    },
    repositories: [repo1, repo2],
  };
  const tribe2 = {
    id_tribe: BigInt(2),
    name: 'name1',
    organization: {
      name: 'org1',
    },
    repositories: [],
  };

  beforeEach(async () => {
    const fakeTribeRepository: Partial<ITribeRepository> = {
      getMetrics: (id: number): Promise<TribeMetricEntity> => {
        const metrics: { [index: number]: TribeMetricEntity } = {
          1: tribe1,
          2: tribe2,
        };
        return Promise.resolve(metrics[id]);
      },
    };

    const fakeVerificationRepository: Partial<IVerificationRepository> = {
      getVerification: () => {
        return Promise.resolve({
          repositories: [
            {
              id: BigInt(11),
              state: 604,
            },
            {
              id: BigInt(12),
              state: 605,
            },
            {
              id: BigInt(13),
              state: 606,
            },
          ],
        });
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [ExceptionsModule, UtilsModule],
      providers: [],
    }).compile();

    const exceptionService = module.get<ExceptionsService>(ExceptionsService);
    const tribeMetricMapper = module.get<TribeMetricMapper>(TribeMetricMapper);

    provider = new ReadMetricTribeUsescases(
      fakeTribeRepository as ITribeRepository,
      fakeVerificationRepository as IVerificationRepository,
      exceptionService,
      tribeMetricMapper,
    );
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should throw error if tribe does not exist', async () => {
    const non_existing_tribe = 101010;
    await expect(provider.execute(non_existing_tribe)).rejects.toThrowError(
      new NotFoundException('La tribu no se encuentra registrada'),
    );
  });

  it('should return repository state from API', async () => {
    const res = await provider.execute(1);

    expect(res).toEqual({
      repositories: expect.arrayContaining([
        {
          id: repo1.id_repository,
          name: repo1.name,
          tribe: tribe1.name,
          organization: tribe1.organization.name,
          coverage: '76%',
          codeSmells: repo1.metrics.code_smells,
          bugs: repo1.metrics.bugs,
          vulnerabilities: repo1.metrics.vulnerabilities,
          hotspots: repo1.metrics.hotspot,
          verificationState: VERIFICATION_VALUES[604],
          state: TRIBE_REPOSITORY_STATE.E,
        },
        {
          id: repo2.id_repository,
          name: repo2.name,
          tribe: tribe1.name,
          organization: tribe1.organization.name,
          coverage: '77%',
          codeSmells: repo2.metrics.code_smells,
          bugs: repo2.metrics.bugs,
          vulnerabilities: repo2.metrics.vulnerabilities,
          hotspots: repo2.metrics.hotspot,
          verificationState: VERIFICATION_VALUES[605],
          state: TRIBE_REPOSITORY_STATE.E,
        },
      ]),
    });
    expect(res.repositories).toHaveLength(2);
  });

  it('should throw error if no repositories comply with the filters', async () => {
    await expect(provider.execute(2)).rejects.toThrowError(
      new NotFoundException(
        'La tribu no tiene repositorios que cumplan con la cobertura necesaria',
      ),
    );
  });
});
