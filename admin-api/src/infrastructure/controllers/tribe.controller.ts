import { Controller, Get, Inject, Param } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { ReadMetricTribeUsescases } from '../../usescases/tribe/read-metric.tribe.usescases';
import { UsecasesProxy } from '../usecases-proxy/usecases-proxy';

@Controller('tribe')
export class TribeController {
  constructor(
    @Inject(UsecasesProxyModule.GET_TRIBE_METRICS_USECASES_PROXY)
    private readonly getTribeMetricsUsecaseProxy: UsecasesProxy<ReadMetricTribeUsescases>,

    @Inject(UsecasesProxyModule.GENERATE_TRIBE_METRICS_REPORT_USECASES_PROXY)
    private readonly generateTribeMetricsReportUsecaseProxy: UsecasesProxy<ReadMetricTribeUsescases>,
  ) {}

  @Get(':id/metrics')
  async getMetrics(@Param('id') id: number) {
    return this.getTribeMetricsUsecaseProxy.getInstance().execute(id);
  }

  @Get(':id/report')
  async generateMetricsReport(@Param('id') id: number) {
    return this.generateTribeMetricsReportUsecaseProxy
      .getInstance()
      .execute(id);
  }
}
