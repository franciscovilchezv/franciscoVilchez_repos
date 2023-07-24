import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [OrganizationController],
})
export class ControllersModule {}
