import { Injectable } from '@nestjs/common';
import { ITribeRepository } from '../../domain/repositories/tribe.repository';
import { TribeMetricEntity } from '../../domain/model/tribe/tribe-metric.entity';
import { PrismaService } from '../config/prisma/prisma.service';
import { REPOSITORY_STATE } from '../../domain/model/tribe/tribe-repository.constant';

@Injectable()
export class TribeRepository implements ITribeRepository {
  static MINIMUM_COVERAGE = 0.75;

  constructor(private readonly prismaService: PrismaService) {}

  async getMetrics(id: number): Promise<TribeMetricEntity> {
    const tribe = await this.prismaService.tribe.findFirst({
      where: {
        id_tribe: id,
      },
      include: {
        repositories: {
          include: {
            metrics: true,
          },
          where: {
            AND: [
              { state: REPOSITORY_STATE.ENABLE },
              {
                created_date: {
                  gt: new Date(new Date().getFullYear(), 0, 1),
                },
              },
              {
                metrics: {
                  AND: [
                    {
                      coverage: {
                        gt: TribeRepository.MINIMUM_COVERAGE,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        organization: true,
      },
    });

    return tribe;
  }
}
