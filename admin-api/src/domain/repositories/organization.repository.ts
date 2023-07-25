import { CreateOrganizationDTO } from '../model/organization/create-organization.dto';
import { OrganizationEntity } from '../model/organization/organization.entity';
import { UpdateOrganizationDTO } from '../model/organization/update-organization.dto';

export interface IOrganizationRepository {
  findAll(): Promise<OrganizationEntity[]>;
  insert(organization: CreateOrganizationDTO): Promise<OrganizationEntity>;
  update(
    id: number,
    organization: Partial<UpdateOrganizationDTO>,
  ): Promise<OrganizationEntity>;
  delete(id: number): Promise<OrganizationEntity[]>;
}
