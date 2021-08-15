import { IsEnum } from 'class-validator';

import { Permissions } from '../../shared/constants';

export class CreatePermissionDto {
  @IsEnum(Permissions)
  permission: Permissions;
}
