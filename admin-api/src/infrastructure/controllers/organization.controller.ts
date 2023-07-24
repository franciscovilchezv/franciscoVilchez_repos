import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { UsecasesProxy } from '../usecases-proxy/usecases-proxy';
import { ReadOrganizationUsescases } from '../../usescases/organization/read.organization.usescases';
import { OrganizationEntity } from '../../domain/model/organization/organization.entity';
import { CreateOrganizationUsescases } from '../../usescases/organization/create.organization.usescases';

@Controller('organization')
export class OrganizationController {
  constructor(
    @Inject(UsecasesProxyModule.GET_ORGANIZATIONS_USECASES_PROXY)
    private readonly getOrganizationUsecaseProxy: UsecasesProxy<ReadOrganizationUsescases>,

    @Inject(UsecasesProxyModule.CREATE_ORGANIZATIONS_USECASES_PROXY)
    private readonly createOrganizationUsecaseProxy: UsecasesProxy<CreateOrganizationUsescases>,
  ) {}

  @Get()
  async findAll() {
    return await this.getOrganizationUsecaseProxy.getInstance().execute();
  }

  @Post()
  async insert(@Body() organizationEntity: OrganizationEntity) {
    return await this.createOrganizationUsecaseProxy
      .getInstance()
      .execute(organizationEntity);
  }
}
