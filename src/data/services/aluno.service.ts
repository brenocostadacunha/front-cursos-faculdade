const API_BASE_URL = 'http://localhost:3000/api';
export interface Aluno {
  id?: number;
  nome: string;
  email: string;
  matricula: string;
  cursoId?: number;
}
export interface CreateAlunoDto {
  nome: string;
  email: string;
  matricula: string;
  cursoId?: number;
}
export interface UpdateAlunoDto {
  nome?: string;
  email?: string;
  matricula?: string;
  cursoId?: number;
}

class AlunoService {
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
   * Lista todos os alunos
   */
  async findAll(): Promise<Aluno[]> {
    try {
      const response = await this.makeRequest<Aluno[]>('/alunos', {
        method: 'GET',
      });
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao buscar alunos');
    }
  }

  /**
   * Busca um aluno por ID
   */
  async findById(id: number): Promise<Aluno> {
    try {
      const response = await this.makeRequest<Aluno>(`/alunos/${id}`, {
        method: 'GET',
      });
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao buscar aluno');
    }
  }

  /**
   * Cria um novo aluno
   */
  async create(alunoData: CreateAlunoDto): Promise<Aluno> {
    try {
      const response = await this.makeRequest<Aluno>('/alunos', {
        method: 'POST',
        body: JSON.stringify(alunoData),
      });
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao criar aluno');
    }
  }

  /**
   * Atualiza um aluno
   */
  async update(id: number, alunoData: UpdateAlunoDto): Promise<Aluno> {
    try {
      const response = await this.makeRequest<Aluno>(`/alunos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(alunoData),
      });
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao atualizar aluno');
    }
  }

  /**
   * Remove um aluno
   */
  async delete(id: number): Promise<void> {
    try {
      await this.makeRequest<void>(`/alunos/${id}`, {
        method: 'DELETE',
      });
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao remover aluno');
    }
  }
}

export const alunoService = new AlunoService(); 