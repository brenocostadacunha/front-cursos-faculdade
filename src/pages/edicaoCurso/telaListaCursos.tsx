import React from 'react';
import NavigationBar from '../../ui/components/NavigationBar/NavigationBar';
import PageLayout from '../../ui/components/PageLayout/PageLayout';
import CourseTable from '../../ui/components/CourseTable/CourseTable';

const cursosExemplo = [
    { id: 1, nomeCurso: 'React Native', nomeProfessor: 'Mestre Jalin Rabei', areaCurso: 'T.I', aluno: 'Julio Silva' },
    { id: 2, nomeCurso: 'Java', nomeProfessor: 'Mestre Jalin Rabei', areaCurso: 'T.I', aluno: 'Julio Silva' },
    { id: 3, nomeCurso: 'Mecânica de Caminhões', nomeProfessor: 'Mestre Jalin Rabei', areaCurso: 'Indústria e Manutenção', aluno: 'Julio Silva' },
    { id: 4, nomeCurso: 'Pintura', nomeProfessor: 'Elma Maria', areaCurso: 'Artes', aluno: 'Julio Silva' },
];
function TelaListaCursos() {
    const handleDelete = (id: number) => {
        console.log('Deletar curso com ID:', id);
    };
    const handleEdit = (id: number) => {
        console.log('Editar curso com ID:', id);

    };
    return (
        <>
            <NavigationBar />
            <PageLayout>
                <CourseTable 
                    title="Lista de Cursos Disponíveis"
                    courses={cursosExemplo}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                />
            </PageLayout>
        </>
    );
}
export default TelaListaCursos;