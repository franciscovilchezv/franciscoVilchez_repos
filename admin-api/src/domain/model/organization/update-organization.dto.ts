import { IsString, MaxLength } from 'class-validator';

export class UpdateOrganizationDTO {
  @IsString()
  @MaxLength(50)
  name: string;
}
