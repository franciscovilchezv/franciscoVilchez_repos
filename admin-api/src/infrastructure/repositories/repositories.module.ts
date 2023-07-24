import { Module } from '@nestjs/common';
import { OrganizationRepository } from './organization.repository';
import { PrismaModule } from '../config/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [OrganizationRepository],
  exports: [OrganizationRepository],
})
export class RepositoriesModule {}
