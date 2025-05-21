// Simulação de autenticação

interface LoginResponse {
  success: boolean;
  token: string;
}

export const isAuthenticated = (): boolean => {
  return localStorage.getItem('auth_token') !== null;
};

// Login simulado
export const login = (email: string, password: string): Promise<LoginResponse> => {
  return new Promise<LoginResponse>((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        const token = 'token_' + Math.random().toString(36).substring(2, 15);
        localStorage.setItem('auth_token', token);
        resolve({ success: true, token });
      } else {
        reject({ message: 'Credenciais inválidas' });
      }
    }, 800);
  });
};

 
export const logout = (): void => {
  localStorage.removeItem('auth_token');
}; 