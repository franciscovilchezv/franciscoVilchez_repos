import { IException } from '../../domain/exception/exceptions.interface';
import { TribeMetricsPresenter } from '../../domain/model/tribe/tribe-metrics.presenter';
import { ITribeRepository } from '../../domain/repositories/tribe.repository';
import { IVerificationRepository } from '../../domain/repositories/verification.repository';
import { VerboseService } from '../../utils/verbose/verbose.service';

export class ReadMetricTribeUsescases {
  constructor(
    private readonly tribeRepository: ITribeRepository,
    private readonly verificationRepository: IVerificationRepository,
    private readonly exceptionsService: IException,
    private readonly verboseService: VerboseService,
  ) {}

  async execute(id: number): Promise<TribeMetricsPresenter> {
    const tribe = await this.tribeRepository.getMetrics(id);

    if (!tribe)
      this.exceptionsService.notFoundException({
        message: 'La tribu no se encuentra registrada',
      });

    if (!tribe.repositories?.length)
      this.exceptionsService.notFoundException({
        message:
          'La tribu no tiene repositorios que cumplan con la cobertura necesaria',
      });

    const repositories = tribe.repositories.map((repo) => {
      return {
        id: repo.id_repository,
        name: repo.name,
        tribe: tribe.name,
        organization: tribe.organization.name,
        coverage: repo.metrics.coverage,
        codeSmells: repo.metrics.code_smells,
        bugs: repo.metrics.bugs,
        vulnerabilities: repo.metrics.vulnerabilities,
        hotspots: repo.metrics.hotspot,
        state: repo.state,
      };
    });

    const verifications = await this.verificationRepository.getVerification();

    const response = repositories.map((repo) => {
      const verificationState = verifications.repositories.find(
        (el) => el.id.toString() === repo.id.toString(),
      ).state;
      return {
        id: repo.id,
        name: repo.name,
        tribe: repo.tribe,
        organization: repo.organization,
        coverage: `${(repo.coverage * 100).toFixed(0)}%`,
        codeSmells: repo.codeSmells,
        bugs: repo.bugs,
        vulnerabilities: repo.vulnerabilities,
        hotspots: repo.hotspots,
        verificationState:
          this.verboseService.getVerificationState(verificationState),
        state: this.verboseService.getRepositoryState(repo.state),
      };
    });

    return { repositories: response };
  }
}
