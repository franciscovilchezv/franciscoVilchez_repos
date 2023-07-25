export class MetricEntity {
  coverage: number;
  code_smells: number;
  bugs: number;
  vulnerabilities: number;
  hotspot: number;
}

export class RepositoryEntity {
  id_repository: bigint;
  name: string;
  metrics: MetricEntity;
  state: string;
}

export class TribeMetricEntity {
  id_tribe: bigint;
  name: string;
  organization: {
    name: string;
  };
  repositories: RepositoryEntity[];
}
