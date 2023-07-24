import { TribeMetricsResponse } from '../../domain/model/tribe/tribe-metrics-response.entity';
import { ITribeRepository } from '../../domain/repositories/tribe.repository';
import { VerificationRepository } from '../../infrastructure/repositories/verification.repository';

export class ReadMetricTribeUsescases {
  constructor(
    private readonly tribeRepository: ITribeRepository,
    private readonly verificationRepository: VerificationRepository,
  ) {}

  async execute(id: number): Promise<TribeMetricsResponse> {
    const repositories = await this.tribeRepository.getMetrics(id);
    const verifications = await this.verificationRepository.getVerification();

    const response = repositories.map((repo) => {
      console.log(repo);
      console.log(verifications);
      const verificationState = verifications.repositories.find(
        (el) => el.id.toString() === repo.id.toString(),
      ).state;
      return {
        id: repo.id,
        name: repo.name,
        tribe: repo.tribe,
        organization: repo.organization,
        coverage: `${(repo.coverage * 100).toFixed(2)}%`,
        codeSmells: repo.codeSmells,
        bugs: repo.bugs,
        vulnerabilities: repo.vulnerabilities,
        hotspots: repo.hotspots,
        verificationState:
          this.verificationRepository.getVerificationState(verificationState),
        state: this.verificationRepository.getRepositoryState(repo.state),
      };
    });

    return { repositories: response };
  }
}
