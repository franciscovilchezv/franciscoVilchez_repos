import { Module } from '@nestjs/common';
import { FileSystemPersistanceService } from './file-system-persistance.service';
import { SkipPersistanceService } from './skip-persistance.service';

@Module({
  providers: [FileSystemPersistanceService, SkipPersistanceService],
  exports: [FileSystemPersistanceService, SkipPersistanceService],
})
export class AdaptersModule {}
