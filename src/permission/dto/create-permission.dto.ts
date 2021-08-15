import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Permissions } from '../../shared/constants';

export class CreatePermissionDto {
  @IsEnum(Permissions)
  @ApiProperty({ enum: Permissions })
  permission: Permissions;
}
