const API_BASE_URL = 'http://localhost:3000/api';
export interface Professor {
  id?: number;
  nome: string;
  email: string;
  registro: string;
  departamento: string;
}
export interface CreateProfessorDto {
  nome: string;
  email: string;
  registro: string;
  departamento: string;
}
export interface UpdateProfessorDto {
  nome?: string;
  email?: string;
  registro?: string;
  departamento?: string;
}

class ProfessorService {
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
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };
    const token = localStorage.getItem('auth_token');
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

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = '/login';
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
   * Lista todos os professores
   */
  async findAll(): Promise<Professor[]> {
    try {
      const response = await this.makeRequest<Professor[]>('/professores', {
        method: 'GET',
      });
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao buscar professores');
    }
  }

  /**
   * Busca um professor por ID
   */
  async findById(id: number): Promise<Professor> {
    try {
      const response = await this.makeRequest<Professor>(`/professores/${id}`, {
        method: 'GET',
      });
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao buscar professor');
    }
  }

  /**
   * Cria um novo professor
   */
  async create(professorData: CreateProfessorDto): Promise<Professor> {
    try {
      const response = await this.makeRequest<Professor>('/professores', {
        method: 'POST',
        body: JSON.stringify(professorData),
      });
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao criar professor');
    }
  }

  /**
   * Atualiza um professor
   */
  async update(id: number, professorData: UpdateProfessorDto): Promise<Professor> {
    try {
      const response = await this.makeRequest<Professor>(`/professores/${id}`, {
        method: 'PUT',
        body: JSON.stringify(professorData),
      });
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao atualizar professor');
    }
  }

  /**
   * Remove um professor
   */
  async delete(id: number): Promise<void> {
    try {
      await this.makeRequest<void>(`/professores/${id}`, {
        method: 'DELETE',
      });
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao remover professor');
    }
  }
}

export const professorService = new ProfessorService(); 