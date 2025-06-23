import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

interface DeleteConfirmationModalProps {
    isOpen: boolean; 
    itemId: number | null; 
    itemName?: string; 
    message?: string; 
    onClose: () => void; 
    onConfirm: (itemId: number) => void; 
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
    isOpen,
    itemId,
    itemName,
    message = "Tem certeza que deseja excluir este item?", 
    onClose,
    onConfirm
}) => {
    if (!isOpen) {
        return null; 
    }

    const handleConfirmClick = () => {
        if (itemId !== null) {
            onConfirm(itemId); 
        }
         onClose();
    };

    const displayMessage = itemName ?
        `Tem certeza que deseja excluir "${itemName}" (ID: ${itemId})?` :
        message; 


    return (
         <div className="modal fade show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirmar Exclusão</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <p>{displayMessage}</p>
                        <p>(Esta exclusão é apenas visual por enquanto)</p> 
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                        <button type="button" className="btn btn-danger" onClick={handleConfirmClick}>Excluir</button>
                    </div>
                </div>
            </div>
         </div>
    );
};

export default DeleteConfirmationModal;