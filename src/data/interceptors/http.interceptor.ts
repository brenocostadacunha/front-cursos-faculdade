import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Interface para configuração de interceptors
interface InterceptorConfig {
  onTokenExpired?: () => void;
  onUnauthorized?: () => void;
  onNetworkError?: (error: AxiosError) => void;
}

class HttpInterceptor {
  private config: InterceptorConfig;

  constructor(config: InterceptorConfig = {}) {
    this.config = {
      onTokenExpired: () => {
        this.handleTokenExpired();
      },
      onUnauthorized: () => {
        this.handleUnauthorized();
      },
      onNetworkError: (error: AxiosError) => {
        this.handleNetworkError(error);
      },
      ...config,
    };
  }

  /**
   * Interceptor para requisições
   */
  requestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
    // Adiciona o token de autenticação se disponível
    const token = this.getStoredToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Adiciona timestamp para evitar cache
    if (config.params) {
      config.params._t = Date.now();
    } else {
      config.params = { _t: Date.now() };
    }

    // Log da requisição em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.log('📤 Request:', {
        url: config.url,
        method: config.method?.toUpperCase(),
        data: config.data,
        params: config.params,
      });
    }

    return config;
  };

  /**
   * Interceptor de erro para requisições
   */
  requestErrorInterceptor = (error: AxiosError): Promise<AxiosError> => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  };

  /**
   * Interceptor para respostas bem-sucedidas
   */
  responseInterceptor = (response: AxiosResponse): AxiosResponse => {
    // Log da resposta em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.log('📥 Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }

    return response;
  };

  /**
   * Interceptor de erro para respostas
   */
  responseErrorInterceptor = (error: AxiosError): Promise<AxiosError> => {
    const { response } = error;

    if (response) {
      switch (response.status) {
        case 401:
          console.warn('🔒 Unauthorized - Token inválido ou expirado');
          this.config.onUnauthorized?.();
          break;

        case 403:
          console.warn('🚫 Forbidden - Acesso negado');
          break;

        case 404:
          console.warn('🔍 Not Found - Recurso não encontrado');
          break;

        case 422:
          console.warn('⚠️ Validation Error - Dados inválidos');
          break;

        case 500:
        case 502:
        case 503:
        case 504:
          console.error('🔥 Server Error - Erro interno do servidor');
          break;

        default:
          console.error(`❌ HTTP Error ${response.status}:`, response.data);
      }
    } else if (error.request) {
      // Erro de rede
      console.error('🌐 Network Error - Falha na conexão');
      this.config.onNetworkError?.(error);
    } else {
      // Erro de configuração da requisição
      console.error('⚙️ Request Configuration Error:', error.message);
    }

    return Promise.reject(this.formatError(error));
  };

  /**
   * Obtém o token armazenado
   */
  private getStoredToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Trata token expirado
   */
  private handleTokenExpired(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    
    // Redireciona para login apenas se não estiver já na página de login
    if (!window.location.pathname.includes('/login')) {
      window.location.href = '/login';
    }
  }

  /**
   * Trata acesso não autorizado
   */
  private handleUnauthorized(): void {
    this.handleTokenExpired();
  }

  /**
   * Trata erros de rede
   */
  private handleNetworkError(error: AxiosError): void {
    // Aqui você pode adicionar lógica para mostrar notificações de erro de rede
    console.error('Erro de conexão:', error.message);
  }

  /**
   * Formata erros para uma estrutura padrão
   */
  private formatError(error: AxiosError): Error {
    const errorMessage = 
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Ocorreu um erro inesperado';

    const formattedError = new Error(errorMessage);
    
    // Adiciona informações extras do erro
    Object.assign(formattedError, {
      status: error.response?.status,
      statusText: error.response?.statusText,
      code: error.code,
      originalError: error,
    });

    return formattedError;
  }
}

export default HttpInterceptor; 