import { IsEnum } from 'class-validator';

import { Permissions } from '../../shared/constants';
import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionDto } from './create-permission.dto';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
  @IsEnum(Permissions)
  permission?: Permissions;
}
