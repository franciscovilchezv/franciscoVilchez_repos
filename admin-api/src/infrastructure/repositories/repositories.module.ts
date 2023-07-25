import { Module } from '@nestjs/common';
import { OrganizationRepository } from './organization.repository';
import { PrismaModule } from '../config/prisma/prisma.module';
import { TribeRepository } from './tribe.repository';
import { HttpModule } from '@nestjs/axios';
import { VerificationRepository } from './verification.repository';
import { ExceptionsModule } from '../exceptions/exceptions.module';

@Module({
  imports: [PrismaModule, HttpModule, ExceptionsModule],
  providers: [OrganizationRepository, TribeRepository, VerificationRepository],
  exports: [OrganizationRepository, TribeRepository, VerificationRepository],
})
export class RepositoriesModule {}
