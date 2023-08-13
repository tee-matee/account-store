import { SetMetadata } from '@nestjs/common';

export enum TypeRoles {
  user,
  Admin,
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: TypeRoles[]) => SetMetadata(ROLES_KEY, roles);