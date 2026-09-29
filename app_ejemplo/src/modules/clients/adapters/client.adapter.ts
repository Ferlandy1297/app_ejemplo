import { ClientDTO } from '../dtos/client.dto';
import { ClientModel } from '../models/client.model';

export class ClientAdapter {
  static toModel(dto: ClientDTO): ClientModel {
    return {
      id: dto.id,
      fullName: dto.fullName,
      email: dto.email,
      phone: dto.phone,
      address: dto.address,
      nit: dto.nit,
      isActive: dto.isActive,
      createdAt: new Date(dto.createdAt),
    };
  }

  static toDTO(model: ClientModel): ClientDTO {
    return {
      id: model.id,
      fullName: model.fullName,
      email: model.email,
      phone: model.phone,
      address: model.address,
      nit: model.nit,
      isActive: model.isActive,
      createdAt: model.createdAt.toISOString(),
    };
  }
}
