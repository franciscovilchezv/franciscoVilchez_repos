import { Injectable } from '@nestjs/common';
import { IOrganizationRepository } from '../../domain/repositories/organization.repository';
import { OrganizationEntity } from '../../domain/model/organization/organization.entity';
import { PrismaService } from '../config/prisma/prisma.service';

@Injectable()
export class OrganizationRepository implements IOrganizationRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(): Promise<OrganizationEntity[]> {
    return this.prismaService.organization.findMany();
  }

  insert(organization: OrganizationEntity): Promise<OrganizationEntity> {
    return this.prismaService.organization.create({
      data: {
        name: organization.name,
      },
    });
  }

  update(
    id: string,
    organization: Partial<OrganizationEntity>,
  ): Promise<OrganizationEntity> {
    throw new Error('Method not implemented.');
  }

  async delete(id: number): Promise<OrganizationEntity[]> {
    await this.prismaService.organization.delete({
      where: { id_organization: id },
    });
    return await this.prismaService.organization.findMany();
  }
}
