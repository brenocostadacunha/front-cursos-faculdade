import React from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import styles from '../../../pages/cursos/telaGerenciamentoCursos.module.scss';
import type { Curso } from '../../../data/services/curso.service';

interface CursoTableProps {
  cursos: Curso[];
  loading: boolean;
  getProfessorNome: (curso: Curso) => string;
  getAlunosCount: (curso: Curso) => number;
  onEdit: (curso: Curso) => void;
  onDelete: (curso: Curso) => void;
}

const CursoTable: React.FC<CursoTableProps> = ({ cursos, loading, getProfessorNome, getAlunosCount, onEdit, onDelete }) => (
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
                          onClick={() => onEdit(curso)}
                          title="Editar"
                        >
                          <i className="bi bi-pencil"></i>
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => onDelete(curso)}
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
);

export default CursoTable; 