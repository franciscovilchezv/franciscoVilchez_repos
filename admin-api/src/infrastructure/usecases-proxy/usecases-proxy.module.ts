import { DynamicModule, Module } from '@nestjs/common';
import { RepositoriesModule } from '../repositories/repositories.module';
import { OrganizationRepository } from '../repositories/organization.repository';
import { UsecasesProxy } from './usecases-proxy';
import { ReadOrganizationUsescases } from '../../usescases/organization/read.organization.usescases';
import { CreateOrganizationUsescases } from '../../usescases/organization/create.organization.usescases';
import { DeleteOrganizationUsescases } from '../../usescases/organization/delete.organization.usescases';
import { UpdateOrganizationUsescases } from '../../usescases/organization/update.organization.usescases';
import { ReadMetricTribeUsescases } from '../../usescases/tribe/read-metric.tribe.usescases';
import { TribeRepository } from '../repositories/tribe.repository';
import { VerificationRepository } from '../repositories/verification.repository';
import { ExceptionsService } from '../exceptions/exceptions.service';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { UtilsModule } from '../../utils/utils.module';
import { AdaptersModule } from '../adapters/adapters.module';
import { FileSystemPersistanceService } from '../adapters/file-system-persistance.service';
import { TribeMetricMapper } from '../../utils/mappers/tribe-metric.mapper';
import { GenerateReportUsescases } from '../../usescases/tribe/generate-report.usescases';

@Module({
  imports: [RepositoriesModule, ExceptionsModule, UtilsModule, AdaptersModule],
})
export class UsecasesProxyModule {
  static GET_ORGANIZATIONS_USECASES_PROXY = 'getOrganizationUsecasesProxy';
  static CREATE_ORGANIZATIONS_USECASES_PROXY =
    'createOrganizationUsecasesProxy';
  static UPDATE_ORGANIZATIONS_USECASES_PROXY =
    'updateOrganizationUsecasesProxy';
  static DELETE_ORGANIZATIONS_USECASES_PROXY =
    'deleteOrganizationUsecasesProxy';

  static GET_TRIBE_METRICS_USECASES_PROXY = 'getTribeMetricsUsecasesProxy';
  static GENERATE_TRIBE_METRICS_REPORT_USECASES_PROXY =
    'generateTribeMetricsReportUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [OrganizationRepository],
          provide: UsecasesProxyModule.GET_ORGANIZATIONS_USECASES_PROXY,
          useFactory: (organizationRepository: OrganizationRepository) =>
            new UsecasesProxy(
              new ReadOrganizationUsescases(organizationRepository),
            ),
        },
        {
          inject: [OrganizationRepository],
          provide: UsecasesProxyModule.CREATE_ORGANIZATIONS_USECASES_PROXY,
          useFactory: (organizationRepository: OrganizationRepository) =>
            new UsecasesProxy(
              new CreateOrganizationUsescases(organizationRepository),
            ),
        },
        {
          inject: [OrganizationRepository],
          provide: UsecasesProxyModule.UPDATE_ORGANIZATIONS_USECASES_PROXY,
          useFactory: (organizationRepository: OrganizationRepository) =>
            new UsecasesProxy(
              new UpdateOrganizationUsescases(organizationRepository),
            ),
        },
        {
          inject: [OrganizationRepository],
          provide: UsecasesProxyModule.DELETE_ORGANIZATIONS_USECASES_PROXY,
          useFactory: (organizationRepository: OrganizationRepository) =>
            new UsecasesProxy(
              new DeleteOrganizationUsescases(organizationRepository),
            ),
        },
        {
          inject: [
            TribeRepository,
            VerificationRepository,
            ExceptionsService,
            TribeMetricMapper,
          ],
          provide: UsecasesProxyModule.GET_TRIBE_METRICS_USECASES_PROXY,
          useFactory: (
            tribeRepository: TribeRepository,
            verificationRepository: VerificationRepository,
            exceptionService: ExceptionsService,
            tribeMetricMapper: TribeMetricMapper,
          ) =>
            new UsecasesProxy(
              new ReadMetricTribeUsescases(
                tribeRepository,
                verificationRepository,
                exceptionService,
                tribeMetricMapper,
              ),
            ),
        },
        {
          inject: [
            TribeRepository,
            VerificationRepository,
            ExceptionsService,
            TribeMetricMapper,
            FileSystemPersistanceService,
          ],
          provide:
            UsecasesProxyModule.GENERATE_TRIBE_METRICS_REPORT_USECASES_PROXY,
          useFactory: (
            tribeRepository: TribeRepository,
            verificationRepository: VerificationRepository,
            exceptionService: ExceptionsService,
            tribeMetricsMapper: TribeMetricMapper,
            diskPersistanceService: FileSystemPersistanceService,
          ) =>
            new UsecasesProxy(
              new GenerateReportUsescases(
                tribeRepository,
                verificationRepository,
                exceptionService,
                tribeMetricsMapper,
                diskPersistanceService,
              ),
            ),
        },
      ],
      exports: [
        UsecasesProxyModule.GET_ORGANIZATIONS_USECASES_PROXY,
        UsecasesProxyModule.CREATE_ORGANIZATIONS_USECASES_PROXY,
        UsecasesProxyModule.UPDATE_ORGANIZATIONS_USECASES_PROXY,
        UsecasesProxyModule.DELETE_ORGANIZATIONS_USECASES_PROXY,
        UsecasesProxyModule.GET_TRIBE_METRICS_USECASES_PROXY,
        UsecasesProxyModule.GENERATE_TRIBE_METRICS_REPORT_USECASES_PROXY,
      ],
    };
  }
}
