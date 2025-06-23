// Integração com o AuthService real
import { authService } from './services/auth.service';

// Interface para resposta de login compatível com o hook existente
interface LoginResponse {
  success: boolean;
  token: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}

export const isAuthenticated = (): boolean => {
  return authService.isAuthenticated();
};

// Login real conectado ao backend
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await authService.login({ email, password });
    return response;
  } catch (error: any) {
    throw new Error(error.message || 'Falha ao fazer login');
  }
};

// Registro de usuário
export const register = async (email: string, password: string, name?: string) => {
  try {
    const response = await authService.register({ email, password, name });
    return response;
  } catch (error: any) {
    throw new Error(error.message || 'Falha ao registrar usuário');
  }
};

// Logout
export const logout = (): void => {
  authService.logout();
};

// Obtém dados do usuário logado
export const getUserData = () => {
  return authService.getUserData();
};

// Obtém token de autenticação
export const getToken = (): string | null => {
  return authService.getToken();
}; 