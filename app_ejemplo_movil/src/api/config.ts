import { Platform } from 'react-native';

// En emuladores Android, 10.0.2.2 apunta a localhost de la máquina host.
// En iOS Simulator y Web, localhost funciona directamente.
// En dispositivos físicos con Expo Go, se puede configurar la IP local de tu máquina.
const getDefaultApiUrl = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:8080/api/v1';
  }
  return 'http://localhost:8080/api/v1';
};

export const API_CONFIG = {
  BASE_URL: getDefaultApiUrl(),
  TIMEOUT: 8000,
};
