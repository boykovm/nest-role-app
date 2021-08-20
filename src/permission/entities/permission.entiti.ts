import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Permissions } from '../../shared/constants';

@Entity('permission')
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  permission: Permissions;
}
