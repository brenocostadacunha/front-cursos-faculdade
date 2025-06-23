// Configuração base da API
const API_BASE_URL = 'http://localhost:3000/api';

// Interface para dados de login
interface LoginData {
  email: string;
  password: string;
}

// Interface para dados de registro
interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

// Interface para resposta de login (baseada na resposta real do backend)
interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    nome: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
}

// Interface para resposta de registro
interface RegisterResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    nome?: string;
  };
}

// Interface compatível com o hook existente
interface CompatibleLoginResponse {
  success: boolean;
  token: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}

class AuthService {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Método privado para fazer requisições HTTP
   */
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    // Adiciona headers padrão
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Adiciona token de autenticação se disponível
    const token = this.getToken();
    if (token) {
      defaultHeaders.Authorization = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      // Verifica se a resposta é bem-sucedida
      if (!response.ok) {
        if (response.status === 401) {
          this.handleUnauthorized();
        }
        
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || 
          errorData.error || 
          `HTTP Error: ${response.status}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Erro de conexão. Verifique sua internet.');
      }
      throw error;
    }
  }

  /**
   * Realiza login do usuário
   */
  async login(loginData: LoginData): Promise<CompatibleLoginResponse> {
    try {
      const response = await this.makeRequest<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(loginData),
      });

      // Verifica se tem token (ao invés de verificar success)
      if (response.token) {
        this.setToken(response.token);
        if (response.user) {
          this.setUserData(response.user);
        }

        // Converte a resposta para o formato compatível
        return {
          success: true,
          token: response.token,
          user: {
            id: response.user.id,
            email: response.user.email,
            name: response.user.nome, // Converte 'nome' para 'name'
          }
        };
      } else {
        throw new Error('Token não recebido do servidor');
      }
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao fazer login');
    }
  }

  /**
   * Registra um novo usuário
   */
  async register(registerData: RegisterData): Promise<RegisterResponse> {
    try {
      const response = await this.makeRequest<RegisterResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(registerData),
      });

      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao registrar usuário');
    }
  }

  /**
   * Verifica se o usuário está autenticado
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  /**
   * Obtém o token do localStorage
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Salva o token no localStorage
   */
  private setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  /**
   * Salva dados do usuário no localStorage
   */
  private setUserData(user: any): void {
    localStorage.setItem('user_data', JSON.stringify(user));
  }

  /**
   * Obtém dados do usuário do localStorage
   */
  getUserData(): any {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  }

  /**
   * Verifica se o token está expirado
   */
  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  }

  /**
   * Trata acesso não autorizado
   */
  private handleUnauthorized(): void {
    this.logout();
    
    // Redireciona para login apenas se não estiver já na página de login
    if (!window.location.pathname.includes('/login')) {
      window.location.href = '/login';
    }
  }

  /**
   * Realiza logout do usuário
   */
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  }
}

// Exporta uma instância única do serviço
export const authService = new AuthService();
export default authService; 