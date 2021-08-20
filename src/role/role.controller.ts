import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';

import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entiti';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    const role: Role = await this.roleService.createRole(createRoleDto);
    return role;
  }

  @Get('all')
  async getAll(): Promise<Role[]> {
    const roles: Role[] = await this.roleService.getAllRole();
    return roles;
  }

  @Get('with-permission')
  @HttpCode(200)
  async getRoleWithPermission(): Promise<Role[]> {
    const roles: Role[] = await this.roleService.roleWithPermission();
    return roles;
  }
}
