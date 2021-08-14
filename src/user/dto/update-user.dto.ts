import { IsEmail, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  readonly name?: string;

  @IsString()
  @IsEmail()
  readonly email?: string;
}
