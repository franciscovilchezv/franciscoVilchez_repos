import { OrganizationEntity } from '../../domain/model/organization/organization.entity';
import { IOrganizationRepository } from '../../domain/repositories/organization.repository';

export class ReadOrganizationUsescases {
  constructor(
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  async execute(): Promise<OrganizationEntity[]> {
    const result = await this.organizationRepository.findAll();
    return result;
  }
}
