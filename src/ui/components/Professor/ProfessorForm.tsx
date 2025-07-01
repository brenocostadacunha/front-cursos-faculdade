import React from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import styles from '../../../pages/professores/telaGerenciamentoProfessores.module.scss';

interface FormData {
  nome: string;
  email: string;
  registro: string;
  departamento: string;
}

interface FormErrors {
  nome?: string;
  email?: string;
  registro?: string;
  departamento?: string;
}

interface ProfessorFormProps {
  formData: FormData;
  formErrors: FormErrors;
  submitting: boolean;
  editingProfessor: boolean;
  onChange: (data: Partial<FormData>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const ProfessorForm: React.FC<ProfessorFormProps> = ({
  formData,
  formErrors,
  submitting,
  editingProfessor,
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
            <Form.Label>Registro *</Form.Label>
            <Form.Control
              type="text"
              value={formData.registro}
              onChange={e => onChange({ registro: e.target.value })}
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
              onChange={e => onChange({ departamento: e.target.value })}
              isInvalid={!!formErrors.departamento}
              placeholder="Digite o departamento"
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.departamento}
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
          editingProfessor ? 'Atualizar' : 'Criar'
        )}
      </Button>
    </div>
  </Form>
);

export default ProfessorForm; 