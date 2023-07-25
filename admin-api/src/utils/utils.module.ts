import { Module } from '@nestjs/common';
import { VerboseService } from './verbose/verbose.service';
import { TribeMetricMapper } from './mappers/tribe-metric.mapper';

@Module({
  providers: [VerboseService, TribeMetricMapper],
  exports: [VerboseService, TribeMetricMapper],
})
export class UtilsModule {}
