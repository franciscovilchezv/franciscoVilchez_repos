import { RepositoryVerificationEntity } from '../model/verification/repository-verification.entity';

export interface IVerificationRepository {
  getVerification(): Promise<RepositoryVerificationEntity>;
}
