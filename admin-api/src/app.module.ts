import { Module, ValidationPipe } from '@nestjs/common';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { UtilsModule } from './utils/utils.module';
import { AdaptersModule } from './infrastructure/adapters/adapters.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [ControllersModule, ExceptionsModule, UtilsModule, AdaptersModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
