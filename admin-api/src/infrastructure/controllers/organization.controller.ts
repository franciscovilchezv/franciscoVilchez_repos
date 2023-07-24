import { Controller, Get, Inject } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { UsecasesProxy } from '../usecases-proxy/usecases-proxy';
import { ReadOrganizationUsescases } from '../../usescases/organization/read.organization.usescases';

@Controller('organization')
export class OrganizationController {
  constructor(
    @Inject(UsecasesProxyModule.GET_ORGANIZATIONS_USECASES_PROXY)
    private readonly getOrganizationUsecaseProxy: UsecasesProxy<ReadOrganizationUsescases>,
  ) {}

  @Get()
  async findAll() {
    return await this.getOrganizationUsecaseProxy.getInstance().execute();
  }
}
