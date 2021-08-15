import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsString({ each: true })
  @ApiProperty()
  readonly permissions: string[];
}
