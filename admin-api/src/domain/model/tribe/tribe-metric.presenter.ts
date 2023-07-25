import { EOL } from 'os';

export class TribeMetricPresenter {
  id: bigint;
  name: string;
  tribe: string;
  organization: string;
  coverage: string;
  codeSmells: number;
  bugs: number;
  vulnerabilities: number;
  hotspots: number;
  verificationState: string;
  state: string;

  constructor(
    id: bigint,
    name: string,
    tribe: string,
    organization: string,
    coverage: string,
    codeSmells: number,
    bugs: number,
    vulnerabilities: number,
    hotspots: number,
    verificationState: string,
    state: string,
  ) {
    this.id = id;
    this.name = name;
    this.tribe = tribe;
    this.organization = organization;
    this.coverage = coverage;
    this.codeSmells = codeSmells;
    this.bugs = bugs;
    this.vulnerabilities = vulnerabilities;
    this.hotspots = hotspots;
    this.verificationState = verificationState;
    this.state = state;
  }

  getCSVValues(headers: string[]): string {
    return headers.map((header) => this[header]).join(',') + EOL;
  }
}
