import React from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import styles from '../../../pages/professores/telaGerenciamentoProfessores.module.scss';
import type { Professor } from '../../../data/services/professor.service';

interface ProfessorDeleteModalProps {
  show: boolean;
  professor?: Professor | null;
  onClose: () => void;
  onDelete: () => void;
  submitting: boolean;
}

const ProfessorDeleteModal: React.FC<ProfessorDeleteModalProps> = ({ show, professor, onClose, onDelete, submitting }) => (
  <Modal show={show} onHide={onClose} className={`${styles.customModal} ${styles.deleteModal}`}>
    <Modal.Header closeButton>
      <Modal.Title>Confirmar Exclusão</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>
        Tem certeza que deseja excluir o professor{' '}
        <strong>{professor?.nome}</strong>?
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

export default ProfessorDeleteModal; 