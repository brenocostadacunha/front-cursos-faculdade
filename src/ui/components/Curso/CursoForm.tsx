import React from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import styles from '../../../pages/cursos/telaGerenciamentoCursos.module.scss';
import type { Aluno } from '../../../data/services/aluno.service';
import type { Professor } from '../../../data/services/professor.service';

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

interface CursoFormProps {
  formData: FormData;
  formErrors: FormErrors;
  professores: Professor[];
  alunos: Aluno[];
  loadingOptions: boolean;
  submitting: boolean;
  editingCurso: boolean;
  onChange: (data: Partial<FormData>) => void;
  onAlunoChange: (alunoId: number, checked: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const CursoForm: React.FC<CursoFormProps> = ({
  formData,
  formErrors,
  professores,
  alunos,
  loadingOptions,
  submitting,
  editingCurso,
  onChange,
  onAlunoChange,
  onSubmit,
  onCancel
}) => (
  <Form onSubmit={onSubmit}>
    <div className="modal-body">
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
              onChange={e => onChange({ nome: e.target.value })}
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
              onChange={e => onChange({ codigo: e.target.value })}
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
              onChange={e => onChange({ departamento: e.target.value })}
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
              onChange={e => onChange({ cargaHoraria: e.target.value })}
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
              onChange={e => onChange({ professorId: e.target.value })}
              isInvalid={!!formErrors.professorId}
            >
              <option value="">Selecione um professor</option>
              {professores.map(professor => (
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
                  onClick={() => onChange({ alunosIds: [] })}
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
                  {alunos.map(aluno => (
                    <div key={aluno.id} className="col-md-6 mb-2">
                      <Form.Check
                        type="checkbox"
                        id={`aluno-${aluno.id}`}
                        label={`${aluno.nome} (${aluno.matricula})`}
                        checked={formData.alunosIds.includes(aluno.id!)}
                        onChange={e => onAlunoChange(aluno.id!, e.target.checked)}
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
    </div>
    <div className="modal-footer">
      <Button variant="secondary" onClick={onCancel} type="button">
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
    </div>
  </Form>
);

export default CursoForm; 