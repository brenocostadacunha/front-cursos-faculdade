import React from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import styles from '../../../pages/cursos/telaGerenciamentoCursos.module.scss';
import type { Curso } from '../../../data/services/curso.service';

interface CursoDeleteModalProps {
  show: boolean;
  curso?: Curso | null;
  onClose: () => void;
  onDelete: () => void;
  submitting: boolean;
}

const CursoDeleteModal: React.FC<CursoDeleteModalProps> = ({ show, curso, onClose, onDelete, submitting }) => (
  <Modal show={show} onHide={onClose} className={`${styles.customModal} ${styles.deleteModal}`}>
    <Modal.Header closeButton>
      <Modal.Title>Confirmar Exclusão</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>
        Tem certeza que deseja excluir o curso{' '}
        <strong>{curso?.nome}</strong>?
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

export default CursoDeleteModal; 