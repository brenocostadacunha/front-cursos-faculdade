import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import NavigationBar from '../navbar/navbar';
import { alunoService, type Aluno, type CreateAlunoDto, type UpdateAlunoDto } from '../../data/services/aluno.service';
import styles from './telaGerenciamentoAlunos.module.scss';

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


          <div className={`card ${styles.tableCard}`}>
            <div className={`card-body text-dark ${styles.cardBody}`}>
              <h4 className="card-title text-center mb-3">Lista de Alunos</h4>
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
                        <th>Matrícula</th>
                        <th>ID do Curso</th>
                        <th style={{width: '120px'}}>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {alunos.length === 0 ? (
                        <tr>
                          <td colSpan={6} className={`text-center ${styles.emptyState}`}>
                            <div className={styles.emptyIcon}>
                              <i className="bi bi-person-x"></i>
                            </div>
                            Nenhum aluno encontrado
                          </td>
                        </tr>
                      ) : (
                        alunos.map((aluno) => (
                          <tr key={aluno.id}>
                            <td>{aluno.id}</td>
                            <td>{aluno.nome}</td>
                            <td>{aluno.email}</td>
                            <td>{aluno.matricula}</td>
                            <td>{aluno.cursoId || '-'}</td>
                            <td>
                              <div className={`d-flex gap-2 ${styles.actionButtons}`}>
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  onClick={() => handleEdit(aluno)}
                                  title="Editar"
                                >
                                  <i className="bi bi-pencil"></i>
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => handleDeleteConfirm(aluno)}
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


      <Modal show={showModal} onHide={handleCloseModal} size="lg" className={styles.customModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingAluno ? 'Editar Aluno' : 'Novo Aluno'}
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
                    placeholder="Digite o nome do aluno"
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
                  <Form.Label>Matrícula *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.matricula}
                    onChange={(e) => setFormData({ ...formData, matricula: e.target.value })}
                    isInvalid={!!formErrors.matricula}
                    placeholder="Digite a matrícula"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.matricula}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className={`mb-3 ${styles.formGroup}`}>
                  <Form.Label>ID do Curso</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.cursoId}
                    onChange={(e) => setFormData({ ...formData, cursoId: e.target.value })}
                    isInvalid={!!formErrors.cursoId}
                    placeholder="Digite o ID do curso (opcional)"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.cursoId}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    Campo opcional - deixe em branco se não aplicável
                  </Form.Text>
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
                editingAluno ? 'Atualizar' : 'Criar'
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>


      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} className={`${styles.customModal} ${styles.deleteModal}`}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Tem certeza que deseja excluir o aluno{' '}
            <strong>{deletingAluno?.nome}</strong>?
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

export default TelaGerenciamentoAlunos; 