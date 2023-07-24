import { Injectable } from '@nestjs/common';
import { IOrganizationRepository } from '../../domain/repositories/organization.repository';
import { OrganizationEntity } from '../../domain/model/organization/organization.entity';
import { PrismaService } from '../config/prisma/prisma.service';

@Injectable()
export class OrganizationRepository implements IOrganizationRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(): Promise<OrganizationEntity[]> {
    return await this.prismaService.organization.findMany();
  }
  insert(organization: OrganizationEntity): Promise<OrganizationEntity> {
    throw new Error('Method not implemented.');
  }
  update(
    id: string,
    organization: Partial<OrganizationEntity>,
  ): Promise<OrganizationEntity> {
    throw new Error('Method not implemented.');
  }
  delete(id: string) {
    throw new Error('Method not implemented.');
  }
}
