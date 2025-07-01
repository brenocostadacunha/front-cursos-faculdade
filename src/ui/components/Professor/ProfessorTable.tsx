import React from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import styles from '../../../pages/professores/telaGerenciamentoProfessores.module.scss';
import type { Professor } from '../../../data/services/professor.service';

interface ProfessorTableProps {
  professores: Professor[];
  loading: boolean;
  onEdit: (professor: Professor) => void;
  onDelete: (professor: Professor) => void;
}

const ProfessorTable: React.FC<ProfessorTableProps> = ({ professores, loading, onEdit, onDelete }) => (
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
                          onClick={() => onEdit(professor)}
                          title="Editar"
                        >
                          <i className="bi bi-pencil"></i>
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => onDelete(professor)}
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

export default ProfessorTable; 