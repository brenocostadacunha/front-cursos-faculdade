const API_BASE_URL = 'http://localhost:3000/api';
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
export interface CreateCursoDto {
  nome: string;
  codigo: string;
  departamento: string;
  cargaHoraria: number;
  professorId: number;
  alunosIds: number[];
}
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
export const cursoService = new CursoService(); 