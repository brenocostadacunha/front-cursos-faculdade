import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import NavigationBar from '../navbar/navbar';
import { cursoService, type Curso, type CreateCursoDto, type UpdateCursoDto } from '../../data/services/curso.service';
import { professorService, type Professor } from '../../data/services/professor.service';
import { alunoService, type Aluno } from '../../data/services/aluno.service';
import styles from './telaGerenciamentoCursos.module.scss';

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

  // Carrega a lista de cursos
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

  // Carrega professores e alunos para os selects
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

  // Abre modal para criar novo curso
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

  // Abre modal para editar curso
  const handleEdit = (curso: Curso) => {
    setEditingCurso(curso);
    // Mapeia os alunos do curso para seus IDs
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

  // Abre modal de confirmação para deletar
  const handleDeleteConfirm = (curso: Curso) => {
    setDeletingCurso(curso);
    setShowDeleteModal(true);
  };

  // Manipula seleção de alunos
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
      const cursoData = {
        nome: formData.nome,
        codigo: formData.codigo,
        departamento: formData.departamento,
        cargaHoraria: Number(formData.cargaHoraria),
        professorId: Number(formData.professorId),
        alunosIds: formData.alunosIds
      };

      if (editingCurso) {
        // Atualizar curso existente
        const updateData: UpdateCursoDto = cursoData;
        await cursoService.update(editingCurso.id!, updateData);
        setSuccess('Curso atualizado com sucesso!');
      } else {
        // Criar novo curso
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

  // Confirma e executa a exclusão
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

  // Fecha modais
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

  // Obtém nome do professor por ID ou do objeto professor
  const getProfessorNome = (curso: Curso) => {
    if (curso.professor) {
      return curso.professor.nome;
    }
    const professor = professores.find(p => p.id === curso.professorId);
    return professor ? professor.nome : `Professor ID: ${curso.professorId}`;
  };

  // Obtém quantidade de alunos
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

          {/* Tabela de Cursos */}
          <div className={`card ${styles.tableCard}`}>
            <div className={`card-body text-dark ${styles.cardBody}`}>
              <h4 className="card-title text-center mb-3">Lista de Cursos</h4>
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
                        <th>Código</th>
                        <th>Departamento</th>
                        <th>Carga Horária</th>
                        <th>Professor</th>
                        <th>Alunos</th>
                        <th style={{width: '120px'}}>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cursos.length === 0 ? (
                        <tr>
                          <td colSpan={8} className={`text-center ${styles.emptyState}`}>
                            <div className={styles.emptyIcon}>
                              <i className="bi bi-book-x"></i>
                            </div>
                            Nenhum curso encontrado
                          </td>
                        </tr>
                      ) : (
                        cursos.map((curso) => (
                          <tr key={curso.id}>
                            <td>{curso.id}</td>
                            <td>{curso.nome}</td>
                            <td><code>{curso.codigo}</code></td>
                            <td>{curso.departamento}</td>
                            <td>{curso.cargaHoraria}h</td>
                            <td>{getProfessorNome(curso)}</td>
                            <td>
                              <span className="badge bg-info">
                                {getAlunosCount(curso)} aluno(s)
                              </span>
                            </td>
                            <td>
                              <div className={`d-flex gap-2 ${styles.actionButtons}`}>
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  onClick={() => handleEdit(curso)}
                                  title="Editar"
                                >
                                  <i className="bi bi-pencil"></i>
                                </Button>
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => handleDeleteConfirm(curso)}
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

      {/* Modal de Criar/Editar Curso */}
      <Modal show={showModal} onHide={handleCloseModal} size="xl" className={styles.customModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingCurso ? 'Editar Curso' : 'Novo Curso'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {loadingOptions && (
              <div className="text-center mb-3">
                <Spinner animation="border" size="sm" className="me-2" />
                Carregando opções...
              </div>
            )}
            
            <div className="row">
              <div className="col-md-6">
                <Form.Group className={`mb-3 ${styles.formGroup}`}>
                  <Form.Label>Nome *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    isInvalid={!!formErrors.nome}
                    placeholder="Digite o nome do curso"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.nome}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className={`mb-3 ${styles.formGroup}`}>
                  <Form.Label>Código *</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.codigo}
                    onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                    isInvalid={!!formErrors.codigo}
                    placeholder="Digite o código do curso"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.codigo}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>
            
            <div className="row">
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
              <div className="col-md-6">
                <Form.Group className={`mb-3 ${styles.formGroup}`}>
                  <Form.Label>Carga Horária *</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.cargaHoraria}
                    onChange={(e) => setFormData({ ...formData, cargaHoraria: e.target.value })}
                    isInvalid={!!formErrors.cargaHoraria}
                    placeholder="Digite a carga horária"
                    min="1"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.cargaHoraria}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <Form.Group className={`mb-3 ${styles.formGroup}`}>
                  <Form.Label>Professor *</Form.Label>
                  <Form.Select
                    value={formData.professorId}
                    onChange={(e) => setFormData({ ...formData, professorId: e.target.value })}
                    isInvalid={!!formErrors.professorId}
                  >
                    <option value="">Selecione um professor</option>
                    {professores.map((professor) => (
                      <option key={professor.id} value={professor.id}>
                        {professor.nome} - {professor.departamento}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formErrors.professorId}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <Form.Group className={`mb-3 ${styles.formGroup}`}>
                  <Form.Label>
                    Alunos ({formData.alunosIds.length}/30)
                    {formData.alunosIds.length > 0 && (
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="text-danger p-0 ms-2"
                        onClick={() => setFormData({...formData, alunosIds: []})}
                      >
                        Limpar seleção
                      </Button>
                    )}
                  </Form.Label>
                  <div className={`border rounded p-3 ${styles.alunosContainer}`} style={{maxHeight: '200px', overflowY: 'auto'}}>
                    {alunos.length === 0 ? (
                      <p className="text-muted mb-0">Nenhum aluno disponível</p>
                    ) : (
                      <div className="row">
                        {alunos.map((aluno) => (
                          <div key={aluno.id} className="col-md-6 mb-2">
                            <Form.Check
                              type="checkbox"
                              id={`aluno-${aluno.id}`}
                              label={`${aluno.nome} (${aluno.matricula})`}
                              checked={formData.alunosIds.includes(aluno.id!)}
                              onChange={(e) => handleAlunoChange(aluno.id!, e.target.checked)}
                              disabled={!formData.alunosIds.includes(aluno.id!) && formData.alunosIds.length >= 30}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {formErrors.alunosIds && (
                    <div className="text-danger small mt-1">
                      {formErrors.alunosIds}
                    </div>
                  )}
                  <Form.Text className="text-muted">
                    Selecione até 30 alunos para o curso
                  </Form.Text>
                </Form.Group>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" disabled={submitting || loadingOptions}>
              {submitting ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Salvando...
                </>
              ) : (
                editingCurso ? 'Atualizar' : 'Criar'
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
            Tem certeza que deseja excluir o curso{' '}
            <strong>{deletingCurso?.nome}</strong>?
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

export default TelaGerenciamentoCursos; 