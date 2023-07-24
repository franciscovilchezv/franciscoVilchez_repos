import { Controller, Get, Inject, Param } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { ReadMetricTribeUsescases } from '../../usescases/tribe/read-metric.tribe.usescases';
import { UsecasesProxy } from '../usecases-proxy/usecases-proxy';

@Controller('tribe')
export class TribeController {
  constructor(
    @Inject(UsecasesProxyModule.GET_TRIBE_METRICS_USECASES_PROXY)
    private readonly getTribeMetricsUsecaseProxy: UsecasesProxy<ReadMetricTribeUsescases>,
  ) {}

  @Get(':id')
  async getMetrics(@Param('id') id: number) {
    return this.getTribeMetricsUsecaseProxy.getInstance().execute(id);
  }
}
