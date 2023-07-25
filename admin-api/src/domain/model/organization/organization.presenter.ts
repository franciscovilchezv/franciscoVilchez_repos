import { Expose } from 'class-transformer';

export class OrganizationPresenter {
  @Expose()
  id_organization: bigint;

  @Expose()
  name: string;
}
