import { OrganizationEntity } from '../model/organization/organization.entity';

export interface IOrganizationRepository {
  findAll(): Promise<OrganizationEntity[]>;
  insert(organization: OrganizationEntity): Promise<OrganizationEntity>;
  update(
    id: string,
    organization: Partial<OrganizationEntity>,
  ): Promise<OrganizationEntity>;
  delete(id: string);
}
