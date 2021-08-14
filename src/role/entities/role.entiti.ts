import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../user/entities/user.entiti';
import { Permission } from '../../permission/entities/permission.entiti';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @OneToMany((type) => User, (user: User) => user.uuid)
  users: User[];

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];
}
