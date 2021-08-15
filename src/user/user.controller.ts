import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res, UseGuards,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entiti';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../role/entities/role.entiti';
import { Response } from 'express';
import { ApiKeyGuard } from '../shared/guards/api-key.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async getAll(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const user: User = await this.userService.getUserById(id);
    if (!user) {
      return res.sendStatus(404);
    }
    return res.send(user);
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

  @Get('for-admin/:id')
  @UseGuards(ApiKeyGuard)
  async adminHello(@Param('id') id: string) {
    const role: Role = await this.userService.getUserRole(id);
    return 'hello admin';
  }
}
