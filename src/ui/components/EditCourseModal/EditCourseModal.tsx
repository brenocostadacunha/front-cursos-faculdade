import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Course {
    id: number;
    nomeCurso: string;
    nomeProfessor: string;
    areaCurso: string;
    aluno: string;
}


interface EditCourseModalProps {
    isOpen: boolean;
    course: Course | null;
    onClose: () => void;
}

const EditCourseModal: React.FC<EditCourseModalProps> = ({ isOpen, course, onClose }) => {
    const [editedCourse, setEditedCourse] = useState<Course | null>(null);

    useEffect(() => {
        if (course) {
            setEditedCourse({ ...course });
        } else {
             setEditedCourse(null);
        }
    }, [course]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;

        setEditedCourse(prevState => {
            if (!prevState) return null;

            return {
                ...prevState,
                [id]: value
            };
        });
    };

    const handleSaveChanges = () => {
        if (!editedCourse) {
             console.error("Nenhum curso selecionado para salvar.");
             return;
        }
        console.log('Simulando salvar alterações. Dados editados:', editedCourse);


        onClose();
    };


    if (!isOpen) {
        return null;
    }

     if (!editedCourse) {
        return (
             <div className="modal fade show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                 <div className="modal-dialog modal-dialog-centered" role="document">
                     <div className="modal-content">
                         <div className="modal-body"><p>Carregando dados para edição...</p></div>
                         <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Fechar</button>
                         </div>
                     </div>
                 </div>
             </div>
        );
     }


    return (
        <div className="modal fade show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar Curso ID: {editedCourse.id}</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="nomeCurso" className="form-label">Nome do Curso</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nomeCurso"
                                    value={editedCourse.nomeCurso}
                                    onChange={handleInputChange}
                                    style={{ backgroundColor: '#f8f9fa' }}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="nomeProfessor" className="form-label">Nome do Professor</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nomeProfessor"
                                    value={editedCourse.nomeProfessor}
                                    onChange={handleInputChange}
                                     style={{ backgroundColor: '#f8f9fa' }}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="areaCurso" className="form-label">Área do Curso</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="areaCurso"
                                    value={editedCourse.areaCurso}
                                    onChange={handleInputChange}
                                     style={{ backgroundColor: '#f8f9fa' }}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="aluno" className="form-label">Aluno no Curso</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="aluno"
                                    value={editedCourse.aluno}
                                    onChange={handleInputChange}
                                     style={{ backgroundColor: '#f8f9fa' }}
                                />
                            </div>

                        </form>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                        <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Salvar Alterações</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditCourseModal;