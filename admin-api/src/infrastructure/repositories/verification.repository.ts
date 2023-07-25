import { Injectable } from '@nestjs/common';
import { IVerificationRepository } from '../../domain/repositories/verification.repository';
import { RepositoryVerificationEntity } from '../../domain/model/verification/repository-verification.entity';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class VerificationRepository implements IVerificationRepository {
  constructor(private readonly httpService: HttpService) {}

  async getVerification(): Promise<RepositoryVerificationEntity> {
    return (await this.httpService.axiosRef.get('http://localhost:3001/codes'))
      .data;
  }
}
