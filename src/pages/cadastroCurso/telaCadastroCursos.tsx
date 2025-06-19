
import React from 'react';
import NavigationBar from '../../ui/components/NavigationBar/NavigationBar';
import PageLayout from '../../ui/components/PageLayout/PageLayout';
import CourseForm from '../../ui/components/CourseForm/CourseForm';

function TelaCadastroCurso() {
    const formFields = [
        { label: 'Nome do Curso:', id: 'nomeCurso', placeholder: 'exemplo de curso:', type: 'text' },
        { label: 'Nome do Professor:', id: 'nomeProfessor', placeholder: 'exemplo de curso:', type: 'text' },
        { label: 'Área do Curso:', id: 'areaCurso', placeholder: 'exemplo de curso:', type: 'text' },
        { label: 'Descrição do Curso:', id: 'descricaoCurso', placeholder: 'exemplo de curso:', type: 'text' }
    ];
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Formulário submetido');
    };
    return (
        <>
            <NavigationBar />
            <PageLayout>
                <CourseForm 
                    title="Cadastro de Curso"
                    fields={formFields}
                    buttonText="Add"
                    onSubmit={handleSubmit}
                />
            </PageLayout>
        </>
    );
}
export default TelaCadastroCurso;