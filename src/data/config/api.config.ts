// Configuração da API com interceptors

// Configuração base da API
const API_CONFIG = {
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Configuração específica para autenticação
const AUTH_CONFIG = {
  loginEndpoint: '/auth/login',
  registerEndpoint: '/auth/register',
  logoutEndpoint: '/auth/logout',
  refreshTokenEndpoint: '/auth/refresh',
};

// Configuração de storage
const STORAGE_CONFIG = {
  tokenKey: 'auth_token',
  userDataKey: 'user_data',
  refreshTokenKey: 'refresh_token',
};

// Configuração de interceptors
const INTERCEPTOR_CONFIG = {
  enableRequestLogging: true,
  enableResponseLogging: true,
  autoRedirectOnUnauthorized: true,
  loginPath: '/login',
};

export {
  API_CONFIG,
  AUTH_CONFIG,
  STORAGE_CONFIG,
  INTERCEPTOR_CONFIG,
}; 