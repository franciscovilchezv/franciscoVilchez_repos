import { Injectable } from '@nestjs/common';
import { IOrganizationRepository } from '../../domain/repositories/organization.repository';
import { OrganizationEntity } from '../../domain/model/organization/organization.entity';
import { PrismaService } from '../config/prisma/prisma.service';
import { CreateOrganizationDTO } from '../../domain/model/organization/create-organization.dto';
import { UpdateOrganizationDTO } from '../../domain/model/organization/update-organization.dto';

@Injectable()
export class OrganizationRepository implements IOrganizationRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(): Promise<OrganizationEntity[]> {
    return this.prismaService.organization.findMany();
  }

  insert(organization: CreateOrganizationDTO): Promise<OrganizationEntity> {
    return this.prismaService.organization.create({
      data: {
        name: organization.name,
      },
    });
  }

  update(
    id: number,
    organization: Partial<UpdateOrganizationDTO>,
  ): Promise<OrganizationEntity> {
    return this.prismaService.organization.update({
      where: { id_organization: id },
      data: organization,
    });
  }

  async delete(id: number): Promise<OrganizationEntity[]> {
    await this.prismaService.organization.delete({
      where: { id_organization: id },
    });
    return await this.prismaService.organization.findMany();
  }
}
