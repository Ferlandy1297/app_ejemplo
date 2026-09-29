export type UserRole = 'ADMIN' | 'LIMITED';

export interface UserModel {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  isActive: boolean;
}
