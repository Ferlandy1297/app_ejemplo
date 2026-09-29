import { API_CONFIG } from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_STORAGE_KEY = '@app_custom_api_url';

export class HttpClient {
  static async getBaseUrl(): Promise<string> {
    try {
      const customUrl = await AsyncStorage.getItem(API_STORAGE_KEY);
      if (customUrl && customUrl.trim()) {
        return customUrl.trim();
      }
    } catch {
      // Usar default
    }
    return API_CONFIG.BASE_URL;
  }

  static async setBaseUrl(url: string): Promise<void> {
    await AsyncStorage.setItem(API_STORAGE_KEY, url);
  }

  static async get<T>(endpoint: string): Promise<T> {
    const baseUrl = await this.getBaseUrl();
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${baseUrl}${cleanEndpoint}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }
}
