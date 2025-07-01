import React, { useState, useEffect } from 'react';
import { Button, Modal, Alert} from 'react-bootstrap';
import NavigationBar from '../../ui/components/Layout/NavigationBar';
import { cursoService, type Curso, type CreateCursoDto, type UpdateCursoDto } from '../../data/services/curso.service';
import { professorService, type Professor } from '../../data/services/professor.service';
import { alunoService, type Aluno } from '../../data/services/aluno.service';
import styles from './telaGerenciamentoCursos.module.scss';
import CursoTable from '../../ui/components/Curso/CursoTable';
import CursoForm from '../../ui/components/Curso/CursoForm';
import CursoDeleteModal from '../../ui/components/Curso/CursoDeleteModal';

interface FormData {
  nome: string;
  codigo: string;
  departamento: string;
  cargaHoraria: string;
  professorId: string;
  alunosIds: number[];
}

interface FormErrors {
  nome?: string;
  codigo?: string;
  departamento?: string;
  cargaHoraria?: string;
  professorId?: string;
  alunosIds?: string;
}

function TelaGerenciamentoCursos() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingCurso, setEditingCurso] = useState<Curso | null>(null);
  const [deletingCurso, setDeletingCurso] = useState<Curso | null>(null);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    codigo: '',
    departamento: '',
    cargaHoraria: '',
    professorId: '',
    alunosIds: []
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const loadCursos = async () => {
    try {
      setLoading(true);
      const data = await cursoService.findAll();
      setCursos(data);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar cursos');
    } finally {
      setLoading(false);
    }
  };
  const loadOptions = async () => {
    try {
      setLoadingOptions(true);
      const [professoresData, alunosData] = await Promise.all([
        professorService.findAll(),
        alunoService.findAll()
      ]);
      setProfessores(professoresData);
      setAlunos(alunosData);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar opções');
    } finally {
      setLoadingOptions(false);
    }
  };

  useEffect(() => {
    loadCursos();
    loadOptions();
  }, []);
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError('');
        setSuccess('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.nome.trim()) {
      errors.nome = 'Nome é obrigatório';
    }
    
    if (!formData.codigo.trim()) {
      errors.codigo = 'Código é obrigatório';
    }
    
    if (!formData.departamento.trim()) {
      errors.departamento = 'Departamento é obrigatório';
    }

    if (!formData.cargaHoraria.trim()) {
      errors.cargaHoraria = 'Carga horária é obrigatória';
    } else if (isNaN(Number(formData.cargaHoraria)) || Number(formData.cargaHoraria) <= 0) {
      errors.cargaHoraria = 'Carga horária deve ser um número positivo';
    }

    if (!formData.professorId) {
      errors.professorId = 'Professor é obrigatório';
    }

    if (formData.alunosIds.length > 30) {
      errors.alunosIds = 'Um curso pode ter no máximo 30 alunos';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleCreate = () => {
    setEditingCurso(null);
    setFormData({ 
      nome: '', 
      codigo: '', 
      departamento: '', 
      cargaHoraria: '', 
      professorId: '', 
      alunosIds: [] 
    });
    setFormErrors({});
    setShowModal(true);
  };
      const handleEdit = (curso: Curso) => {
    setEditingCurso(curso);
    const alunosIds: number[] = curso.alunos ? curso.alunos.map(aluno => aluno.id) : (curso.alunosIds || []);
    setFormData({
      nome: curso.nome,
      codigo: curso.codigo,
      departamento: curso.departamento,
      cargaHoraria: curso.cargaHoraria.toString(),
      professorId: curso.professorId.toString(),
      alunosIds: alunosIds
    });
    setFormErrors({});
    setShowModal(true);
  };
  const handleDeleteConfirm = (curso: Curso) => {
    setDeletingCurso(curso);
    setShowDeleteModal(true);
  };
  const handleAlunoChange = (alunoId: number, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        alunosIds: [...prev.alunosIds, alunoId]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        alunosIds: prev.alunosIds.filter(id => id !== alunoId)
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const cursoData = {
        nome: formData.nome,
        codigo: formData.codigo,
        departamento: formData.departamento,
        cargaHoraria: Number(formData.cargaHoraria),
        professorId: Number(formData.professorId),
        alunosIds: formData.alunosIds
      };

      if (editingCurso) {
        const updateData: UpdateCursoDto = cursoData;
        await cursoService.update(editingCurso.id!, updateData);
        setSuccess('Curso atualizado com sucesso!');
      } else {
        const createData: CreateCursoDto = cursoData;
        await cursoService.create(createData);
        setSuccess('Curso criado com sucesso!');
      }

      setShowModal(false);
      await loadCursos();
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar curso');
    } finally {
      setSubmitting(false);
    }
  };
  const handleDelete = async () => {
    if (!deletingCurso) return;

    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      await cursoService.delete(deletingCurso.id!);
      setSuccess('Curso excluído com sucesso!');
      setShowDeleteModal(false);
      await loadCursos();
    } catch (err: any) {
      setError(err.message || 'Erro ao excluir curso');
    } finally {
      setSubmitting(false);
      setDeletingCurso(null);
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCurso(null);
    setFormData({ 
      nome: '', 
      codigo: '', 
      departamento: '', 
      cargaHoraria: '', 
      professorId: '', 
      alunosIds: [] 
    });
    setFormErrors({});
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingCurso(null);
  };
  const getProfessorNome = (curso: Curso) => {
    if (curso.professor) {
      return curso.professor.nome;
    }
    const professor = professores.find(p => p.id === curso.professorId);
    return professor ? professor.nome : `Professor ID: ${curso.professorId}`;
  };
  const getAlunosCount = (curso: Curso) => {
    if (curso.alunos) {
      return curso.alunos.length;
    }
    return curso.alunosIds ? curso.alunosIds.length : 0;
  };

  return (
    <>
      <NavigationBar />
      <div className={`${styles.heroGradientBackground} text-white py-5`}>
        <div className="container">
          <div className={`d-flex justify-content-between align-items-center mb-4 ${styles.pageHeader}`}>
            <h2>Gerenciamento de Cursos</h2>
            <Button variant="success" onClick={handleCreate}>
              <i className="bi bi-plus-circle me-2"></i>
              Novo Curso
            </Button>
          </div>

          {error && (
            <Alert variant="danger" dismissible onClose={() => setError('')} className={styles.alertMessage}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert variant="success" dismissible onClose={() => setSuccess('')} className={styles.alertMessage}>
              {success}
            </Alert>
          )}

          <CursoTable
            cursos={cursos}
            loading={loading}
            getProfessorNome={getProfessorNome}
            getAlunosCount={getAlunosCount}
            onEdit={handleEdit}
            onDelete={handleDeleteConfirm}
          />
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} size="xl" className={styles.customModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingCurso ? 'Editar Curso' : 'Novo Curso'}
          </Modal.Title>
        </Modal.Header>
        <CursoForm
          formData={formData}
          formErrors={formErrors}
          professores={professores}
          alunos={alunos}
          loadingOptions={loadingOptions}
          submitting={submitting}
          editingCurso={!!editingCurso}
          onChange={data => setFormData(prev => ({ ...prev, ...data }))}
          onAlunoChange={handleAlunoChange}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>

      <CursoDeleteModal
        show={showDeleteModal}
        curso={deletingCurso}
        onClose={handleCloseDeleteModal}
        onDelete={handleDelete}
        submitting={submitting}
      />
    </>
  );
}

export default TelaGerenciamentoCursos; 