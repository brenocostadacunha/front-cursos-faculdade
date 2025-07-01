import React, { useState, useEffect } from 'react';
import { Button, Modal, Alert} from 'react-bootstrap';
import NavigationBar from '../../ui/components/Layout/NavigationBar';
import { alunoService, type Aluno, type CreateAlunoDto, type UpdateAlunoDto } from '../../data/services/aluno.service';
import styles from './telaGerenciamentoAlunos.module.scss';
import AlunoTable from '../../ui/components/Aluno/AlunoTable';
import AlunoForm from '../../ui/components/Aluno/AlunoForm';
import AlunoDeleteModal from '../../ui/components/Aluno/AlunoDeleteModal';

interface FormData {
  nome: string;
  email: string;
  matricula: string;
  cursoId: string;
}

function TelaGerenciamentoAlunos() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingAluno, setEditingAluno] = useState<Aluno | null>(null);
  const [deletingAluno, setDeletingAluno] = useState<Aluno | null>(null);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    matricula: '',
    cursoId: ''
  });

  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const loadAlunos = async () => {
    try {
      setLoading(true);
      const data = await alunoService.findAll();
      setAlunos(data);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar alunos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlunos();
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
    const errors: Partial<FormData> = {};
    
    if (!formData.nome.trim()) {
      errors.nome = 'Nome é obrigatório';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email inválido';
    }
    
    if (!formData.matricula.trim()) {
      errors.matricula = 'Matrícula é obrigatória';
    }


    if (formData.cursoId && formData.cursoId.trim() && isNaN(Number(formData.cursoId))) {
      errors.cursoId = 'ID do curso deve ser um número';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleCreate = () => {
    setEditingAluno(null);
    setFormData({ nome: '', email: '', matricula: '', cursoId: '' });
    setFormErrors({});
    setShowModal(true);
  };
  const handleEdit = (aluno: Aluno) => {
    setEditingAluno(aluno);
    setFormData({
      nome: aluno.nome,
      email: aluno.email,
      matricula: aluno.matricula,
      cursoId: aluno.cursoId ? aluno.cursoId.toString() : ''
    });
    setFormErrors({});
    setShowModal(true);
  };
  const handleDeleteConfirm = (aluno: Aluno) => {
    setDeletingAluno(aluno);
    setShowDeleteModal(true);
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

      const cursoId = formData.cursoId && formData.cursoId.trim() 
        ? Number(formData.cursoId) 
        : undefined;

              if (editingAluno) {
        const updateData: UpdateAlunoDto = {
          nome: formData.nome,
          email: formData.email,
          matricula: formData.matricula,
          cursoId
        };
        await alunoService.update(editingAluno.id!, updateData);
        setSuccess('Aluno atualizado com sucesso!');
              } else {
        const createData: CreateAlunoDto = {
          nome: formData.nome,
          email: formData.email,
          matricula: formData.matricula,
          cursoId
        };
        await alunoService.create(createData);
        setSuccess('Aluno criado com sucesso!');
      }

      setShowModal(false);
      await loadAlunos();
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar aluno');
    } finally {
      setSubmitting(false);
    }
  };
  const handleDelete = async () => {
    if (!deletingAluno) return;

    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      await alunoService.delete(deletingAluno.id!);
      setSuccess('Aluno excluído com sucesso!');
      setShowDeleteModal(false);
      await loadAlunos();
    } catch (err: any) {
      setError(err.message || 'Erro ao excluir aluno');
    } finally {
      setSubmitting(false);
      setDeletingAluno(null);
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingAluno(null);
    setFormData({ nome: '', email: '', matricula: '', cursoId: '' });
    setFormErrors({});
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingAluno(null);
  };

  return (
    <>
      <NavigationBar />
      <div className={`${styles.heroGradientBackground} text-white py-5`}>
        <div className="container">
          <div className={`d-flex justify-content-between align-items-center mb-4 ${styles.pageHeader}`}>
            <h2>Gerenciamento de Alunos</h2>
            <Button variant="success" onClick={handleCreate}>
              <i className="bi bi-plus-circle me-2"></i>
              Novo Aluno
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

          <AlunoTable
            alunos={alunos}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDeleteConfirm}
          />
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} size="lg" className={styles.customModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingAluno ? 'Editar Aluno' : 'Novo Aluno'}
          </Modal.Title>
        </Modal.Header>
        <AlunoForm
          formData={formData}
          formErrors={formErrors}
          submitting={submitting}
          editingAluno={!!editingAluno}
          onChange={data => setFormData(prev => ({ ...prev, ...data }))}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>

      <AlunoDeleteModal
        show={showDeleteModal}
        aluno={deletingAluno}
        onClose={handleCloseDeleteModal}
        onDelete={handleDelete}
        submitting={submitting}
      />
    </>
  );
}

export default TelaGerenciamentoAlunos; 