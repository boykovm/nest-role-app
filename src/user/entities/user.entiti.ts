import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail } from 'class-validator';

import { Role } from '../../role/entities/role.entiti';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  roleUuid?: string;

  @ManyToOne((type) => Role, (role) => role.uuid)
  role?: Role;
}
