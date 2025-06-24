// Configuração base da API
const API_BASE_URL = 'http://localhost:3000/api';

// Interface para dados do curso
export interface Curso {
  id?: number;
  nome: string;
  codigo: string;
  departamento: string;
  cargaHoraria: number;
  professorId: number;
  professor?: {
    id: number;
    nome: string;
    email: string;
    registro: string;
    departamento: string;
    createdAt: string;
    updatedAt: string;
  };
  alunos?: Array<{
    id: number;
    nome: string;
    email: string;
    matricula: string;
    createdAt: string;
    updatedAt: string;
  }>;
  alunosIds?: number[];
}

// Interface para criar curso
export interface CreateCursoDto {
  nome: string;
  codigo: string;
  departamento: string;
  cargaHoraria: number;
  professorId: number;
  alunosIds: number[];
}

// Interface para atualizar curso
export interface UpdateCursoDto {
  nome?: string;
  codigo?: string;
  departamento?: string;
  cargaHoraria?: number;
  professorId?: number;
  alunosIds?: number[];
}

class CursoService {
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

      // Verifica se a resposta é bem-sucedida
      if (!response.ok) {
        if (response.status === 401) {
          // Redireciona para login se não autorizado
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
   * Lista todos os cursos
   */
  async findAll(): Promise<Curso[]> {
    try {
      const response = await this.makeRequest<Curso[]>('/cursos', {
        method: 'GET',
      });
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao buscar cursos');
    }
  }

  /**
   * Busca um curso por ID
   */
  async findById(id: number): Promise<Curso> {
    try {
      const response = await this.makeRequest<Curso>(`/cursos/${id}`, {
        method: 'GET',
      });
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao buscar curso');
    }
  }

  /**
   * Cria um novo curso
   */
  async create(cursoData: CreateCursoDto): Promise<Curso> {
    try {
      const response = await this.makeRequest<Curso>('/cursos', {
        method: 'POST',
        body: JSON.stringify(cursoData),
      });
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao criar curso');
    }
  }

  /**
   * Atualiza um curso
   */
  async update(id: number, cursoData: UpdateCursoDto): Promise<Curso> {
    try {
      const response = await this.makeRequest<Curso>(`/cursos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(cursoData),
      });
      return response;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao atualizar curso');
    }
  }

  /**
   * Remove um curso
   */
  async delete(id: number): Promise<void> {
    try {
      await this.makeRequest<void>(`/cursos/${id}`, {
        method: 'DELETE',
      });
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao remover curso');
    }
  }
}

// Instância única do serviço
export const cursoService = new CursoService(); 