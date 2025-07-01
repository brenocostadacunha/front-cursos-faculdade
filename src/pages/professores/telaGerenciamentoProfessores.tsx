import React, { useState, useEffect } from 'react';
import { Button, Modal, Alert} from 'react-bootstrap';
import NavigationBar from '../../ui/components/Layout/NavigationBar';
import { professorService, type Professor, type CreateProfessorDto, type UpdateProfessorDto } from '../../data/services/professor.service';
import styles from './telaGerenciamentoProfessores.module.scss';
import ProfessorTable from '../../ui/components/Professor/ProfessorTable';
import ProfessorForm from '../../ui/components/Professor/ProfessorForm';
import ProfessorDeleteModal from '../../ui/components/Professor/ProfessorDeleteModal';

interface FormData {
  nome: string;
  email: string;
  registro: string;
  departamento: string;
}

function TelaGerenciamentoProfessores() {
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingProfessor, setEditingProfessor] = useState<Professor | null>(null);
  const [deletingProfessor, setDeletingProfessor] = useState<Professor | null>(null);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    registro: '',
    departamento: ''
  });

  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const loadProfessores = async () => {
    try {
      setLoading(true);
      const data = await professorService.findAll();
      setProfessores(data);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar professores');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfessores();
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
    
    if (!formData.registro.trim()) {
      errors.registro = 'Registro é obrigatório';
    }
    
    if (!formData.departamento.trim()) {
      errors.departamento = 'Departamento é obrigatório';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleCreate = () => {
    setEditingProfessor(null);
    setFormData({ nome: '', email: '', registro: '', departamento: '' });
    setFormErrors({});
    setShowModal(true);
  };
  const handleEdit = (professor: Professor) => {
    setEditingProfessor(professor);
    setFormData({
      nome: professor.nome,
      email: professor.email,
      registro: professor.registro,
      departamento: professor.departamento
    });
    setFormErrors({});
    setShowModal(true);
  };
  const handleDeleteConfirm = (professor: Professor) => {
    setDeletingProfessor(professor);
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
      if (editingProfessor) {
        const updateData: UpdateProfessorDto = { ...formData };
        await professorService.update(editingProfessor.id!, updateData);
        setSuccess('Professor atualizado com sucesso!');
      } else {
        const createData: CreateProfessorDto = { ...formData };
        await professorService.create(createData);
        setSuccess('Professor criado com sucesso!');
      }

      setShowModal(false);
      await loadProfessores();
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar professor');
    } finally {
      setSubmitting(false);
    }
  };
  const handleDelete = async () => {
    if (!deletingProfessor) return;

    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      await professorService.delete(deletingProfessor.id!);
      setSuccess('Professor excluído com sucesso!');
      setShowDeleteModal(false);
      await loadProfessores();
    } catch (err: any) {
      setError(err.message || 'Erro ao excluir professor');
    } finally {
      setSubmitting(false);
      setDeletingProfessor(null);
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProfessor(null);
    setFormData({ nome: '', email: '', registro: '', departamento: '' });
    setFormErrors({});
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingProfessor(null);
  };

  return (
    <>
      <NavigationBar />
      <div className={`${styles.heroGradientBackground} text-white py-5`}>
        <div className="container">
          <div className={`d-flex justify-content-between align-items-center mb-4 ${styles.pageHeader}`}>
            <h2>Gerenciamento de Professores</h2>
            <Button variant="success" onClick={handleCreate}>
              <i className="bi bi-plus-circle me-2"></i>
              Novo Professor
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

          <ProfessorTable
            professores={professores}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDeleteConfirm}
          />
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} size="lg" className={styles.customModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProfessor ? 'Editar Professor' : 'Novo Professor'}
          </Modal.Title>
        </Modal.Header>
        <ProfessorForm
          formData={formData}
          formErrors={formErrors}
          submitting={submitting}
          editingProfessor={!!editingProfessor}
          onChange={data => setFormData(prev => ({ ...prev, ...data }))}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>

      <ProfessorDeleteModal
        show={showDeleteModal}
        professor={deletingProfessor}
        onClose={handleCloseDeleteModal}
        onDelete={handleDelete}
        submitting={submitting}
      />
    </>
  );
}

export default TelaGerenciamentoProfessores; 