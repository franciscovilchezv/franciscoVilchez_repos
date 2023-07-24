import { DynamicModule, Module } from '@nestjs/common';
import { RepositoriesModule } from '../repositories/repositories.module';
import { OrganizationRepository } from '../repositories/organization.repository';
import { UsecasesProxy } from './usecases-proxy';
import { ReadOrganizationUsescases } from '../../usescases/organization/read.organization.usescases';

@Module({
  imports: [RepositoriesModule],
})
export class UsecasesProxyModule {
  static GET_ORGANIZATIONS_USECASES_PROXY = 'getOrganizationUsecasesProxy';

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
      ],
      exports: [UsecasesProxyModule.GET_ORGANIZATIONS_USECASES_PROXY],
    };
  }
}
