import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { TribeController } from './tribe.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [OrganizationController, TribeController],
})
export class ControllersModule {}
