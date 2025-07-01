import React from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import styles from '../../../pages/alunos/telaGerenciamentoAlunos.module.scss';

interface FormData {
  nome: string;
  email: string;
  matricula: string;
  cursoId: string;
}

interface FormErrors {
  nome?: string;
  email?: string;
  matricula?: string;
  cursoId?: string;
}

interface AlunoFormProps {
  formData: FormData;
  formErrors: FormErrors;
  submitting: boolean;
  editingAluno: boolean;
  onChange: (data: Partial<FormData>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const AlunoForm: React.FC<AlunoFormProps> = ({
  formData,
  formErrors,
  submitting,
  editingAluno,
  onChange,
  onSubmit,
  onCancel
}) => (
  <Form onSubmit={onSubmit}>
    <div className="modal-body">
      <div className="row">
        <div className="col-md-6">
          <Form.Group className={`mb-3 ${styles.formGroup}`}>
            <Form.Label>Nome *</Form.Label>
            <Form.Control
              type="text"
              value={formData.nome}
              onChange={e => onChange({ nome: e.target.value })}
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
              onChange={e => onChange({ email: e.target.value })}
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
              onChange={e => onChange({ matricula: e.target.value })}
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
            <Form.Label>Curso ID</Form.Label>
            <Form.Control
              type="text"
              value={formData.cursoId}
              onChange={e => onChange({ cursoId: e.target.value })}
              isInvalid={!!formErrors.cursoId}
              placeholder="Digite o ID do curso"
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.cursoId}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
      </div>
    </div>
    <div className="modal-footer">
      <Button variant="secondary" onClick={onCancel} type="button">
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
    </div>
  </Form>
);

export default AlunoForm; 