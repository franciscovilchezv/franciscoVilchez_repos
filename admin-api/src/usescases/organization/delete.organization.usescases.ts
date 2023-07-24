import { OrganizationEntity } from '../../domain/model/organization/organization.entity';
import { IOrganizationRepository } from '../../domain/repositories/organization.repository';

export class DeleteOrganizationUsescases {
  constructor(
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  async execute(id: number): Promise<OrganizationEntity[]> {
    const result = await this.organizationRepository.delete(id);
    return result;
  }
}
