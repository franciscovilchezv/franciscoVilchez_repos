export class TribeMetricEntity {
  id: bigint;
  name: string;
  tribe: string;
  organization: string;
  coverage: number;
  codeSmells: number;
  bugs: number;
  vulnerabilities: number;
  hotspots: number;
  state: string;
}
