import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

import { PermissionService } from './permission.service';
import { Permission } from './entities/permission.entiti';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get('all')
  async getAll(): Promise<Permission[]> {
    return await this.permissionService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Permission> {
    return await this.permissionService.getPermissionById(id);
  }

  @Post()
  async createPermission(
    @Body() createPermissionDto: CreatePermissionDto,
  ): Promise<Permission> {
    return await this.permissionService.createPermission(createPermissionDto);
  }

  @Patch(':id')
  async updatePermission(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ): Promise<UpdateResult> {
    return await this.permissionService.updatePermission(
      id,
      updatePermissionDto,
    );
  }

  @Delete(':id')
  async deletePermission(@Param('id') id: string): Promise<DeleteResult> {
    return await this.permissionService.deletePermissionById(id);
  }
}
