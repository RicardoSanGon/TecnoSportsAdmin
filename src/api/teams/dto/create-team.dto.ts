import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsExists } from 'src/validations/exists.constraint';

export class CreateTeamDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  logoUrl: string;

  @IsOptional()
  @IsExists({ tableName: 'confederations', column: 'id' })
  confederationId: number;
}
