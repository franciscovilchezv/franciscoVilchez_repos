import { Injectable } from '@nestjs/common';
import { VERIFICATION_VALUES } from '../../domain/model/verification/verification.constant';
import { TRIBE_REPOSITORY_STATE } from '../../domain/model/tribe/tribe-repository.constant';

@Injectable()
export class VerboseService {
  getVerificationState(state: number): string {
    return VERIFICATION_VALUES[state];
  }

  getRepositoryState(state: string): string {
    return TRIBE_REPOSITORY_STATE[state];
  }
}
