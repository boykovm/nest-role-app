import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from './entities/role.entiti';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const name: string = createRoleDto.name;
    const role: Role = await this.roleRepository.create({ name });
    const permissions = [];
    createRoleDto.permissions.forEach((permission: string) => {
      permissions.push({ uuid: permission });
    });
    role.permissions = permissions;
    return this.roleRepository.save(role);
  }

  getAllRole(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async roleWithPermission(): Promise<Role[]> {
    return await this.roleRepository.find({
      relations: ['permissions'],
    });
  }

  getRoleById(id): Promise<Role> {
    return this.roleRepository.findOne(id);
  }
}
