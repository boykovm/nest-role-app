import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { User } from './entities/user.entiti';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../role/entities/role.entiti';
import { RoleService } from '../role/role.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly roleService: RoleService,
  ) {}

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  getUserById(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  updateUserById(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.userRepository.update({ uuid: id }, { ...updateUserDto });
  }

  deleteUserById(id: string): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  async addRoleToUser(id: string, body): Promise<UpdateResult> {
    return await this.userRepository.update(id, {
      roleUuid: body.roleUuid,
    });
  }

  async getUserRole(id: string): Promise<Role> {
    const user = await this.userRepository.findOne(id);
    if (!user.roleUuid) {
      return null;
    }
    return this.roleService.getRoleById(user.roleUuid);
  }
}
