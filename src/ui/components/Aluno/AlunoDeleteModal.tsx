import React from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import styles from '../../../pages/alunos/telaGerenciamentoAlunos.module.scss';
import type { Aluno } from '../../../data/services/aluno.service';

interface AlunoDeleteModalProps {
  show: boolean;
  aluno?: Aluno | null;
  onClose: () => void;
  onDelete: () => void;
  submitting: boolean;
}

const AlunoDeleteModal: React.FC<AlunoDeleteModalProps> = ({ show, aluno, onClose, onDelete, submitting }) => (
  <Modal show={show} onHide={onClose} className={`${styles.customModal} ${styles.deleteModal}`}>
    <Modal.Header closeButton>
      <Modal.Title>Confirmar Exclusão</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>
        Tem certeza que deseja excluir o aluno{' '}
        <strong>{aluno?.nome}</strong>?
      </p>
      <p className="text-danger small">
        Esta ação não pode ser desfeita.
      </p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>
        Cancelar
      </Button>
      <Button variant="danger" onClick={onDelete} disabled={submitting}>
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
);

export default AlunoDeleteModal; 