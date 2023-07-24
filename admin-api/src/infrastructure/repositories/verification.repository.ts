import { Injectable } from '@nestjs/common';
import { IVerificationRepository } from '../../domain/repositories/verification.repository';
import { RepositoryVerificationEntity } from '../../domain/model/verification/repository-verification.entity';
import { HttpService } from '@nestjs/axios';
import { VERIFICATION_VALUES } from '../../domain/model/verification/verification.constant';
import { TRIBE_REPOSITORY_STATE } from '../../domain/model/tribe/tribe-repository.constant';

@Injectable()
export class VerificationRepository implements IVerificationRepository {
  constructor(private readonly httpService: HttpService) {}

  async getVerification(): Promise<RepositoryVerificationEntity> {
    return (await this.httpService.axiosRef.get('http://localhost:3001/codes'))
      .data;
  }

  getVerificationState(state: number): string {
    return VERIFICATION_VALUES[state];
  }

  getRepositoryState(state: string): string {
    return TRIBE_REPOSITORY_STATE[state];
  }
}
