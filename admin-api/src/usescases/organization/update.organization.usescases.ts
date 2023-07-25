import { OrganizationEntity } from '../../domain/model/organization/organization.entity';
import { UpdateOrganizationDTO } from '../../domain/model/organization/update-organization.dto';
import { IOrganizationRepository } from '../../domain/repositories/organization.repository';

export class UpdateOrganizationUsescases {
  constructor(
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  async execute(
    id: number,
    organization: Partial<UpdateOrganizationDTO>,
  ): Promise<OrganizationEntity> {
    const result = await this.organizationRepository.update(id, organization);
    return result;
  }
}
