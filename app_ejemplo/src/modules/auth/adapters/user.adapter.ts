import { UserDTO } from '../dtos/user.dto';
import { UserModel } from '../models/user.model';

export class UserAdapter {
  static toModel(dto: UserDTO): UserModel {
    return {
      id: dto.id,
      email: dto.email,
      fullName: dto.fullName,
      role: dto.roleCode,
      isActive: dto.isActive,
    };
  }
}
