import { IsNotEmpty, IsString } from 'class-validator';

export class CreateConfederationDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
