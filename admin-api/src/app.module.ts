import { Module } from '@nestjs/common';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [ControllersModule, ExceptionsModule, UtilsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
