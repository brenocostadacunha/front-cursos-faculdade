import React from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import styles from '../../../pages/alunos/telaGerenciamentoAlunos.module.scss';
import type { Aluno } from '../../../data/services/aluno.service';

interface AlunoTableProps {
  alunos: Aluno[];
  loading: boolean;
  onEdit: (aluno: Aluno) => void;
  onDelete: (aluno: Aluno) => void;
}

const AlunoTable: React.FC<AlunoTableProps> = ({ alunos, loading, onEdit, onDelete }) => (
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
                <th>Curso ID</th>
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
                    <td>{aluno.cursoId}</td>
                    <td>
                      <div className={`d-flex gap-2 ${styles.actionButtons}`}>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => onEdit(aluno)}
                          title="Editar"
                        >
                          <i className="bi bi-pencil"></i>
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => onDelete(aluno)}
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

export default AlunoTable; 