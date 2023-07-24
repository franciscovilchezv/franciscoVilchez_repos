import { OrganizationEntity } from '../../domain/model/organization/organization.entity';
import { IOrganizationRepository } from '../../domain/repositories/organization.repository';

export class CreateOrganizationUsescases {
  constructor(
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  async execute(organization: OrganizationEntity): Promise<OrganizationEntity> {
    const result = await this.organizationRepository.insert(organization);
    return result;
  }
}
