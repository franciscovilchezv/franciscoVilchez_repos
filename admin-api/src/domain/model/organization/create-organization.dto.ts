import { IsString, MaxLength } from 'class-validator';

export class CreateOrganizationDTO {
  @IsString()
  @MaxLength(50)
  name: string;
}
