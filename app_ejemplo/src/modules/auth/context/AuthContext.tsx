'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserModel } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { UserAdapter } from '../adapters/user.adapter';
import { HttpClient } from '@/shared/api/httpClient';

const INACTIVITY_TIMEOUT_MS = 15_000;

interface AuthContextType {
  user: UserModel | null;
  isAuthenticated: boolean;
  isLoginModalOpen: boolean;
  isLoading: boolean;
  loginError: string | null;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<UserModel | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    // Restaurar sesión activa desde localStorage en el primer render del cliente
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('app_user_session');
      const accessToken = localStorage.getItem('app_auth_token');
      const refreshToken = localStorage.getItem('app_refresh_token');
      if (savedUser && accessToken && refreshToken) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          localStorage.removeItem('app_user_session');
        }
      }
    }
  }, []);

  useEffect(() => {
    const handleSessionExpired = () => {
      setUser(null);
      setLoginError('La sesión expiró y no pudo renovarse. Ingresa nuevamente.');
      setIsLoginModalOpen(true);
      router.replace('/');
    };

    window.addEventListener(HttpClient.SESSION_EXPIRED_EVENT, handleSessionExpired);
    return () => window.removeEventListener(HttpClient.SESSION_EXPIRED_EVENT, handleSessionExpired);
  }, [router]);

  useEffect(() => {
    if (!user) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    const activityEvents: Array<keyof WindowEventMap> = [
      'mousemove',
      'mousedown',
      'keydown',
      'scroll',
      'touchstart',
    ];

    const closeInactiveSession = () => {
      setUser(null);
      AuthService.logout();
      setLoginError('Sesión cerrada por 15 segundos de inactividad.');
      setIsLoginModalOpen(true);
      router.replace('/');
    };

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(closeInactiveSession, INACTIVITY_TIMEOUT_MS);
    };

    activityEvents.forEach((eventName) => window.addEventListener(eventName, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      activityEvents.forEach((eventName) => window.removeEventListener(eventName, resetTimer));
    };
  }, [user, router]);

  const openLoginModal = () => {
    setLoginError(null);
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginError(null);
    setIsLoginModalOpen(false);
  };

  const login = async (email: string, pass: string): Promise<boolean> => {
    setIsLoading(true);
    setLoginError(null);

    try {
      // Capa Service (Obtiene DTO)
      const userDto = await AuthService.login(email, pass);

      if (!userDto) {
        setLoginError('Credenciales inválidas o usuario inactivo.');
        setIsLoading(false);
        return false;
      }

      // Capa Adapter (Transforma DTO -> Model)
      const userModel = UserAdapter.toModel(userDto);

      // Actualiza Estado UI y LocalStorage
      setUser(userModel);
      if (typeof window !== 'undefined') {
        localStorage.setItem('app_user_session', JSON.stringify(userModel));
      }

      setIsLoginModalOpen(false);
      setIsLoading(false);
      return true;
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Ocurrió un error al procesar el inicio de sesión.';
      setLoginError(msg);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setLoginError(null);
    AuthService.logout();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoginModalOpen,
        isLoading,
        loginError,
        openLoginModal,
        closeLoginModal,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};
