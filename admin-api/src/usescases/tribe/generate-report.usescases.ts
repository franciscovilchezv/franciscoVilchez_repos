import { IDiskPersistance } from '../../domain/adapters/disk-persistance.interface';
import { IException } from '../../domain/exception/exceptions.interface';
import { TribeMetricEntity } from '../../domain/model/tribe/tribe-metric.entity';
import { TribeMetricsPresenter } from '../../domain/model/tribe/tribe-metrics.presenter';
import { RepositoryVerificationEntity } from '../../domain/model/verification/repository-verification.entity';
import { ITribeRepository } from '../../domain/repositories/tribe.repository';
import { IVerificationRepository } from '../../domain/repositories/verification.repository';
import { TribeMetricMapper } from '../../utils/mappers/tribe-metric.mapper';

export class GenerateReportUsescases {
  constructor(
    private readonly tribeRepository: ITribeRepository,
    private readonly verificationRepository: IVerificationRepository,
    private readonly exceptionsService: IException,
    private readonly tribeMetricMapper: TribeMetricMapper,
    private readonly diskPersistanceService: IDiskPersistance,
  ) {}

  async execute(id: number): Promise<string> {
    const tribe: TribeMetricEntity = await this.tribeRepository.getMetrics(id);

    if (!tribe)
      this.exceptionsService.notFoundException({
        message: 'La tribu no se encuentra registrada',
      });

    if (!tribe.repositories?.length)
      this.exceptionsService.notFoundException({
        message:
          'La tribu no tiene repositorios que cumplan con la cobertura necesaria',
      });

    const verifications: RepositoryVerificationEntity =
      await this.verificationRepository.getVerification();

    const response: TribeMetricsPresenter =
      this.tribeMetricMapper.mapEntitiesToPresenter(tribe, verifications);

    return this.diskPersistanceService.persistData(response.toCSVFormat());
  }
}
