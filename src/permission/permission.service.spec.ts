import { Test, TestingModule } from '@nestjs/testing';
import { PermissionService } from './permission.service';
import { Connection } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entiti';

describe('PermissionService', () => {
  let service: PermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionService,
        { provide: Connection, useValue: {} },
        { provide: getRepositoryToken(Permission), useValue: {} },
      ],
    }).compile();

    service = module.get<PermissionService>(PermissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('getPermissionById', () => {
  //   describe('when we have permission', () => {
  //     it('should return permission object', async () => {
  //       const permissionId = 'd5c602d6-0963-4d7b-baec-d372b9c087fe';
  //       const expectedPermission = {
  //         uuid: 'd5c602d6-0963-4d7b-baec-d372b9c087fe',
  //         permission: 'update',
  //       };
  //
  //       const permission = await service.getPermissionById(permissionId);
  //       console.log(permission);
  //       expect(true);
  //     });
  //   });
  //   describe('otherwise', () => {
  //     it('should throw the http error', async () => {
  //       const permissionId = '1';
  //       const expectedPermission = {
  //         uuid: 'd5c602d6-0963-4d7b-baec-d372b9c087fe',
  //         permission: 'update',
  //       };
  //
  //       const permission = await service.getPermissionById(permissionId);
  //       // expect(permission).toEqual(expectedPermission);
  //       expect(true);
  //     });
  //   });
  // });
  describe('getPermissionById', () => {
    it('should return a permission object', async () => {
      const expectedPermission = {
        uuid: 'd5c602d6-0963-4d7b-baec-d372b9c087fe',
        permission: 'update',
      };

      expect(
        await service.getPermissionById('d5c602d6-0963-4d7b-baec-d372b9c087fe'),
      ).toBe(expectedPermission);
    });
  });
});
