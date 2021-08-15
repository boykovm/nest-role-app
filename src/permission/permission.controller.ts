import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post, Res,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

import { PermissionService } from './permission.service';
import { Permission } from './entities/permission.entiti';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Response } from 'express';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get('all')
  async getAll(): Promise<Permission[]> {
    return await this.permissionService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    const permission: Permission =
      await this.permissionService.getPermissionById(id);
    if (!permission) {
      return res.sendStatus(404);
    }
    return res.send(permission);
  }

  @Post()
  async createPermission(
    @Body() createPermissionDto: CreatePermissionDto,
  ): Promise<Permission> {
    return await this.permissionService.createPermission(createPermissionDto);
  }

  @Patch(':id')
  @HttpCode(204)
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
