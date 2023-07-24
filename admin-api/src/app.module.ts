import { Module } from '@nestjs/common';
import { ControllersModule } from './infrastructure/controllers/controllers.module';

@Module({
  imports: [ControllersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
