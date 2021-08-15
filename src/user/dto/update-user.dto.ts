import { IsEmail, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @ApiProperty()
  readonly name?: string;

  @IsString()
  @IsEmail()
  @ApiProperty()
  readonly email?: string;

  @IsString()
  @ApiProperty()
  readonly roleUuid?: string;
}
