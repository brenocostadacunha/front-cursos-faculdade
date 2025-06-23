import React, { useState, useRef, useEffect } from 'react';
import NavigationBar from '../../ui/components/NavigationBar/NavigationBar';
import PageLayout from '../../ui/components/PageLayout/PageLayout';
import CourseTable from '../../ui/components/CourseTable/CourseTable';
import EditCourseModal from '../../ui/components/EditCourseModal/EditCourseModal';

import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteConfirmationModal from '../../ui/components/DeleteConfirmationModal/DeleteConfirmationModal';

interface Course {
    id: number;
    nomeCurso: string;
    nomeProfessor: string;
    areaCurso: string;
    aluno: string;
}

const cursosExemploInicial: Course[] = [
    { id: 1, nomeCurso: 'React Native', nomeProfessor: 'Mestre Jalin Rabei', areaCurso: 'T.I', aluno: 'Julio Silva' },
    { id: 2, nomeCurso: 'Java', nomeProfessor: 'Mestre Jalin Rabei', areaCurso: 'T.I', aluno: 'Julio Silva' },
    { id: 3, nomeCurso: 'Mecânica de Caminhões', nomeProfessor: 'Mestre Jalin Rabei', areaCurso: 'Indústria e Manutenção', aluno: 'Julio Silva' },
    { id: 4, nomeCurso: 'Pintura', nomeProfessor: 'Elma Maria', areaCurso: 'Artes', aluno: 'Julio Silva' },
];

function TelaListaCursos() {
    const [courses, setCourses] = useState<Course[]>(cursosExemploInicial);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [showDeleteSuccessMessage, setShowDeleteSuccessMessage] = useState(false);

    const deleteSuccessMessageTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleDelete = (id: number) => {
         const courseToDelete = courses.find(course => course.id === id);
         if (courseToDelete) {
             setSelectedCourse(courseToDelete);
             setShowDeleteModal(true);
         }
    };

    const handleEdit = (id: number) => {
         const courseToEdit = courses.find(course => course.id === id);
         if (courseToEdit) {
            setSelectedCourse(courseToEdit);
            setShowEditModal(true);
         }
    };

    const confirmDelete = () => {
        if (selectedCourse !== null) {
            setCourses(courses.filter(course => course.id !== selectedCourse.id));

            setShowDeleteSuccessMessage(true);

             if (deleteSuccessMessageTimeoutRef.current) {
                 clearTimeout(deleteSuccessMessageTimeoutRef.current);
             }

            deleteSuccessMessageTimeoutRef.current = setTimeout(() => {
                setShowDeleteSuccessMessage(false);
            }, 3000);


        }
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedCourse(null);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedCourse(null);
    };

     useEffect(() => {
         return () => {
             if (deleteSuccessMessageTimeoutRef.current) {
                 clearTimeout(deleteSuccessMessageTimeoutRef.current);
             }
         };
     }, []);


    return (
        <>
            <NavigationBar />
            <PageLayout>
                 {showDeleteSuccessMessage && (
                    <div className="container mt-3">
                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                           Curso excluído com sucesso (visualmente)!
                           <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowDeleteSuccessMessage(false)}></button>
                        </div>
                    </div>
                 )}

                <CourseTable
                    title="Lista de Cursos Disponíveis"
                    courses={courses}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                />

                <DeleteConfirmationModal
                    isOpen={showDeleteModal}
                    itemId={selectedCourse?.id || null}
                    itemName={selectedCourse?.nomeCurso || undefined}
                    onClose={handleCloseDeleteModal}
                    onConfirm={confirmDelete}
                />

                <EditCourseModal
                    isOpen={showEditModal}
                    course={selectedCourse}
                    onClose={handleCloseEditModal}
                />
            </PageLayout>
        </>
    );
}
export default TelaListaCursos;