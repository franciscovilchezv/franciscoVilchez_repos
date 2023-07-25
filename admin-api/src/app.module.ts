import { Module } from '@nestjs/common';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { UtilsModule } from './utils/utils.module';
import { AdaptersModule } from './infrastructure/adapters/adapters.module';

@Module({
  imports: [ControllersModule, ExceptionsModule, UtilsModule, AdaptersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
