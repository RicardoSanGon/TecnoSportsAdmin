import { PartialType } from '@nestjs/mapped-types';
import { CreateConfederationDto } from './create-confederation.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateConfederationDto extends PartialType(
  CreateConfederationDto,
) {
  @IsNotEmpty()
  @IsString()
  name: string;
}
