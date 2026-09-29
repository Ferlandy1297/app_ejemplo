import { HttpClient, ApiResponse } from '@/shared/api/httpClient';
import { ClientAdapter } from '../adapters/client.adapter';
import { ClientModel } from '../models/client.model';
import { ClientDTO } from '../dtos/client.dto';

export interface PageResult<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export class ClientService {
  /**
   * Obtiene la lista de clientes paginada desde el backend REST.
   */
  static async getClients(
    search: string = '',
    page: number = 0,
    size: number = 5
  ): Promise<PageResult<ClientModel>> {
    try {
      const searchParam = search.trim() ? `&search=${encodeURIComponent(search.trim())}` : '';
      const response = await HttpClient.get<ApiResponse<PageResult<ClientDTO>>>(
        `/clients?page=${page}&size=${size}${searchParam}`
      );

      if (response.success && response.data) {
        return {
          content: response.data.content.map(ClientAdapter.toModel),
          pageNumber: response.data.pageNumber,
          pageSize: response.data.pageSize,
          totalElements: response.data.totalElements,
          totalPages: response.data.totalPages,
        };
      }
      throw new Error('Respuesta inválida del servidor');
    } catch (error) {
      console.error('No fue posible obtener los clientes mediante el BFF:', error);
      throw error;
    }
  }

  static async create(data: Omit<ClientModel, 'id' | 'createdAt'>): Promise<ClientModel> {
    const response = await HttpClient.post<ApiResponse<ClientDTO>>('/clients', {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      nit: data.nit,
      isActive: data.isActive,
    });
    return ClientAdapter.toModel(response.data);
  }

  static async update(
    id: string,
    data: Partial<Omit<ClientModel, 'id' | 'createdAt'>>
  ): Promise<ClientModel> {
    const response = await HttpClient.put<ApiResponse<ClientDTO>>(`/clients/${id}`, data);
    return ClientAdapter.toModel(response.data);
  }

  static async toggleActive(id: string): Promise<ClientModel> {
    const response = await HttpClient.patch<ApiResponse<ClientDTO>>(`/clients/${id}/toggle-status`);
    return ClientAdapter.toModel(response.data);
  }

  static async delete(id: string): Promise<void> {
    await HttpClient.delete<ApiResponse<void>>(`/clients/${id}`);
  }
}
