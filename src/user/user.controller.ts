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

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entiti';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../role/entities/role.entiti';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async getAll(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getuserById(@Param('id') id: string): Promise<User> {
    return await this.userService.getUserById(id);
  }

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return await this.userService.createUser(user);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.userService.updateUserById(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<DeleteResult> {
    return await this.userService.deleteUserById(id);
  }

  @Patch(':id/add-role')
  async addRole(@Param('id') id: string, @Body() body): Promise<UpdateResult> {
    return await this.userService.addRoleToUser(id, body);
  }

  @Get('role/:id')
  async getUserRole(@Param('id') id: string): Promise<Role> {
    return await this.userService.getUserRole(id);
  }
}
