import { Module } from '@nestjs/common';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { PrismaModule } from './infrastructure/config/prisma/prisma.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { UsecasesProxyModule } from './infrastructure/usecases-proxy/usecases-proxy.module';

@Module({
  imports: [
    PrismaModule,
    RepositoriesModule,
    UsecasesProxyModule.register(),
    ControllersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
