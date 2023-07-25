import { Injectable } from '@nestjs/common';
import { TribeMetricsPresenter } from '../../domain/model/tribe/tribe-metrics.presenter';
import { TribeMetricEntity } from '../../domain/model/tribe/tribe-metric.entity';
import { RepositoryVerificationEntity } from '../../domain/model/verification/repository-verification.entity';
import { TribeMetricPresenter } from '../../domain/model/tribe/tribe-metric.presenter';
import { VerboseService } from '../verbose/verbose.service';

@Injectable()
export class TribeMetricMapper {
  constructor(private readonly verboseService: VerboseService) {}

  mapEntitiesToPresenter(
    tribe: TribeMetricEntity,
    verifications: RepositoryVerificationEntity,
  ): TribeMetricsPresenter {
    const repositories: TribeMetricPresenter[] = tribe.repositories.map(
      (repo) => {
        const verificationState = verifications.repositories.find(
          (el) => el.id.toString() === repo.id_repository.toString(),
        ).state;

        return new TribeMetricPresenter(
          repo.id_repository,
          repo.name,
          tribe.name,
          tribe.organization.name,
          `${(repo.metrics.coverage * 100).toFixed(0)}%`,
          repo.metrics.code_smells,
          repo.metrics.bugs,
          repo.metrics.vulnerabilities,
          repo.metrics.hotspot,
          this.verboseService.getVerificationState(verificationState),
          this.verboseService.getRepositoryState(repo.state),
        );
      },
    ) as TribeMetricPresenter[];

    const response: TribeMetricsPresenter = new TribeMetricsPresenter(
      repositories,
    );

    return response;
  }
}
