import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { UserService } from '../../user/user.service';

import { Role } from '../../role/entities/role.entiti';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  canActivate = async (context: ExecutionContext) => {
    const req: Request = context.switchToHttp().getRequest<Request>();
    const userId: string = req.path.slice(16);
    const role: Role = await this.userService.getUserRole(userId);
    return role.name === 'admin';
  };
}
