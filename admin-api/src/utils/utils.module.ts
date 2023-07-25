import { Module } from '@nestjs/common';
import { VerboseService } from './verbose/verbose.service';

@Module({
  providers: [VerboseService],
  exports: [VerboseService],
})
export class UtilsModule {}
