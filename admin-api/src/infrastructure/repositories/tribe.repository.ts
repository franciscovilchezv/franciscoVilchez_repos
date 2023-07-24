import { Injectable } from '@nestjs/common';
import { ITribeRepository } from '../../domain/repositories/tribe.repository';
import { TribeMetricEntity } from '../../domain/model/tribe/tribe-metric.entity';
import { PrismaService } from '../config/prisma/prisma.service';

@Injectable()
export class TribeRepository implements ITribeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getMetrics(id: number): Promise<TribeMetricEntity[]> {
    const tribe = await this.prismaService.tribe.findFirst({
      where: {
        id_tribe: id,
      },
      include: {
        repositories: { include: { metrics: true } },
        organization: true,
      },
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

    return repositories;
  }
}
