import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Permission } from './entities/permission.entiti';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  getAll(): Promise<Permission[]> {
    return this.permissionRepository.find();
  }

  getPermissionById(id): Promise<Permission> {
    return this.permissionRepository.findOne(id);
  }

  createPermission(
    createPermissionDto: CreatePermissionDto,
  ): Promise<Permission> {
    const permission = this.permissionRepository.create(createPermissionDto);
    return this.permissionRepository.save(permission);
  }

  updatePermission(
    id: string,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<UpdateResult> {
    return this.permissionRepository.update(
      { uuid: id },
      { ...updatePermissionDto },
    );
  }

  deletePermissionById(id: string): Promise<DeleteResult> {
    return this.permissionRepository.delete(id);
  }
}
