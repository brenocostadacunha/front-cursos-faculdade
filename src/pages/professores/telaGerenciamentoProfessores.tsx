import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import NavigationBar from '../navbar/navbar';
import { professorService, type Professor, type CreateProfessorDto, type UpdateProfessorDto } from '../../data/services/professor.service';
import styles from './telaGerenciamentoProfessores.module.scss';

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

  // Carrega a lista de professores
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

  // Limpa os alerts após 3 segundos
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError('');
        setSuccess('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  // Valida o formulário
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

  // Abre modal para criar novo professor
  const handleCreate = () => {
    setEditingProfessor(null);
    setFormData({ nome: '', email: '', registro: '', departamento: '' });
    setFormErrors({});
    setShowModal(true);
  };

  // Abre modal para editar professor
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

  // Abre modal de confirmação para deletar
  const handleDeleteConfirm = (professor: Professor) => {
    setDeletingProfessor(professor);
    setShowDeleteModal(true);
  };

  // Submete o formulário
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
        // Atualizar professor existente
        const updateData: UpdateProfessorDto = { ...formData };
        await professorService.update(editingProfessor.id!, updateData);
        setSuccess('Professor atualizado com sucesso!');
      } else {
        // Criar novo professor
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

  // Confirma e executa a exclusão
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

  // Fecha modais
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

          {/* Alerts */}
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

          {/* Tabela de Professores */}
          <div className={`card ${styles.tableCard}`}>
            <div className={`card-body text-dark ${styles.cardBody}`}>
              <h4 className="card-title text-center mb-3">Lista de Professores</h4>
              <hr className="border-dark mb-4" />

              {loading ? (
                <div className="text-center py-4">
                  <Spinner animation="border" role="status" className={styles.loadingSpinner}>
                    <span className="visually-hidden">Carregando...</span>
                  </Spinner>
                </div>
              ) : (
                <div className={`table-responsive ${styles.tableResponsive}`}>
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Registro</th>
                        <th>Departamento</th>
                        <th style={{width: '120px'}}>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {professores.length === 0 ? (
                        <tr>
                          <td colSpan={6} className={`text-center ${styles.emptyState}`}>
                            <div className={styles.emptyIcon}>
                              <i className="bi bi-person-x"></i>
                            </div>
                            Nenhum professor encontrado
                          </td>
                        </tr>
                      ) : (
                        professores.map((professor) => (
                          <tr key={professor.id}>
                            <td>{professor.id}</td>
                            <td>{professor.nome}</td>
                            <td>{professor.email}</td>
                            <td>{professor.registro}</td>
                            <td>{professor.departamento}</td>
                            <td>
                              <div className={`d-flex gap-2 ${styles.actionButtons}`}>
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  onClick={() => handleEdit(professor)}
                                  title="Editar"
                                >
                                  <i className="bi bi-pencil"></i>
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => handleDeleteConfirm(professor)}
                                  title="Excluir"
                                >
                                  <i className="bi bi-trash"></i>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Criar/Editar Professor */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" className={styles.customModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProfessor ? 'Editar Professor' : 'Novo Professor'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className={`mb-3 ${styles.formGroup}`}>
                  <Form.Label>Nome *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    isInvalid={!!formErrors.nome}
                    placeholder="Digite o nome do professor"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.nome}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className={`mb-3 ${styles.formGroup}`}>
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    isInvalid={!!formErrors.email}
                    placeholder="Digite o email"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className={`mb-3 ${styles.formGroup}`}>
                  <Form.Label>Registro *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.registro}
                    onChange={(e) => setFormData({ ...formData, registro: e.target.value })}
                    isInvalid={!!formErrors.registro}
                    placeholder="Digite o registro"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.registro}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className={`mb-3 ${styles.formGroup}`}>
                  <Form.Label>Departamento *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.departamento}
                    onChange={(e) => setFormData({ ...formData, departamento: e.target.value })}
                    isInvalid={!!formErrors.departamento}
                    placeholder="Digite o departamento"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.departamento}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Salvando...
                </>
              ) : (
                editingProfessor ? 'Atualizar' : 'Criar'
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal de Confirmação de Exclusão */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} className={`${styles.customModal} ${styles.deleteModal}`}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Tem certeza que deseja excluir o professor{' '}
            <strong>{deletingProfessor?.nome}</strong>?
          </p>
          <p className="text-danger small">
            Esta ação não pode ser desfeita.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={submitting}>
            {submitting ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Excluindo...
              </>
            ) : (
              'Excluir'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TelaGerenciamentoProfessores; 