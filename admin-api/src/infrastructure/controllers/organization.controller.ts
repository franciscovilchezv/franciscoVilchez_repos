import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { UsecasesProxy } from '../usecases-proxy/usecases-proxy';
import { ReadOrganizationUsescases } from '../../usescases/organization/read.organization.usescases';
import { CreateOrganizationUsescases } from '../../usescases/organization/create.organization.usescases';
import { DeleteOrganizationUsescases } from '../../usescases/organization/delete.organization.usescases';
import { UpdateOrganizationUsescases } from '../../usescases/organization/update.organization.usescases';
import { CreateOrganizationDTO } from '../../domain/model/organization/create-organization.dto';
import { UpdateOrganizationDTO } from '../../domain/model/organization/update-organization.dto';
import { Serialize } from '../common/interceptors/serialize.interceptor';
import { OrganizationPresenter } from '../../domain/model/organization/organization.presenter';

@Serialize(OrganizationPresenter)
@Controller('organization')
export class OrganizationController {
  constructor(
    @Inject(UsecasesProxyModule.GET_ORGANIZATIONS_USECASES_PROXY)
    private readonly getOrganizationUsecaseProxy: UsecasesProxy<ReadOrganizationUsescases>,

    @Inject(UsecasesProxyModule.CREATE_ORGANIZATIONS_USECASES_PROXY)
    private readonly createOrganizationUsecaseProxy: UsecasesProxy<CreateOrganizationUsescases>,

    @Inject(UsecasesProxyModule.UPDATE_ORGANIZATIONS_USECASES_PROXY)
    private readonly updateOrganizationUsecaseProxy: UsecasesProxy<UpdateOrganizationUsescases>,

    @Inject(UsecasesProxyModule.DELETE_ORGANIZATIONS_USECASES_PROXY)
    private readonly deleteOrganizationUsecaseProxy: UsecasesProxy<DeleteOrganizationUsescases>,
  ) {}

  @Get()
  async findAll() {
    return await this.getOrganizationUsecaseProxy.getInstance().execute();
  }

  @Post()
  async insert(@Body() organizationEntity: CreateOrganizationDTO) {
    return await this.createOrganizationUsecaseProxy
      .getInstance()
      .execute(organizationEntity);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() organizationEntity: Partial<UpdateOrganizationDTO>,
  ) {
    return await this.updateOrganizationUsecaseProxy
      .getInstance()
      .execute(id, organizationEntity);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.deleteOrganizationUsecaseProxy.getInstance().execute(id);
  }
}
