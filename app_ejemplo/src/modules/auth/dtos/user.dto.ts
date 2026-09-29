export interface UserDTO {
  id: string;
  email: string;
  password?: string;
  fullName: string;
  roleCode: 'ADMIN' | 'LIMITED';
  isActive: boolean;
}
