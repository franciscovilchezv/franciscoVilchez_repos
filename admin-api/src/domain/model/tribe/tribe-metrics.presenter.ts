import { EOL } from 'os';
import { TribeMetricPresenter } from './tribe-metric.presenter';

export class TribeMetricsPresenter {
  repositories: TribeMetricPresenter[];

  constructor(repositories: TribeMetricPresenter[]) {
    this.repositories = repositories;
  }

  static csvHeaders(): string[] {
    return [
      'id',
      'name',
      'tribe',
      'organization',
      'coverage',
      'codeSmells',
      'bugs',
      'vulnerabilities',
      'hotspots',
      'verificationState',
      'state',
    ];
  }

  toCSVFormat(): string {
    const values = this.repositories.map((repo) => {
      return repo.getCSVValues(TribeMetricsPresenter.csvHeaders());
    });

    return TribeMetricsPresenter.csvHeaders().join(',') + EOL + values.join('');
  }
}
