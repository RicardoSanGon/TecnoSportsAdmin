import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEmail()
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'Invalid email format',
  })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z]+(?: [a-zA-Z]+)+$/, {
    message: "Isn't a valid Name",
  })
  name: string;
}
