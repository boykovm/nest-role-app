import { IsEnum } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

import { Permissions } from '../../shared/constants';
import { CreatePermissionDto } from './create-permission.dto';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
  @IsEnum(Permissions)
  @ApiProperty({ enum: Permissions })
  permission?: Permissions;
}
