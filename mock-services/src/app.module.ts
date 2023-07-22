import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CodesModule } from './codes/codes.module';

@Module({
  imports: [CodesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
