import { IsString } from 'class-validator';

import { Permissions } from '../../shared/constants';

export class CreatePermissionDto {
  @IsString()
  permission: Permissions;
}
