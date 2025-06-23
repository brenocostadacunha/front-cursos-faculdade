import React, { useState, useRef, useEffect } from 'react';
import NavigationBar from '../../ui/components/NavigationBar/NavigationBar';
import PageLayout from '../../ui/components/PageLayout/PageLayout';
import CourseForm from '../../ui/components/CourseForm/CourseForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function TelaCadastroCurso() {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const formFields = [
        { label: 'Nome do Curso:', id: 'nomeCurso', placeholder: 'exemplo de curso:', type: 'text' },
        { label: 'Nome do Professor:', id: 'nomeProfessor', placeholder: 'exemplo de curso:', type: 'text' },
        { label: 'Área do Curso:', id: 'areaCurso', placeholder: 'exemplo de curso:', type: 'text' },
        { label: 'Descrição do Curso:', id: 'descricaoCurso', placeholder: 'exemplo de curso:', type: 'text' }
    ];

    const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        console.log('Formulário submetido');

        const form = event.target as HTMLFormElement;
        const nomeCursoInput = form.elements.namedItem('nomeCurso') as HTMLInputElement;
        const nomeProfessorInput = form.elements.namedItem('nomeProfessor') as HTMLInputElement;
        const areaCursoInput = form.elements.namedItem('areaCurso') as HTMLInputElement;
        const descricaoCursoInput = form.elements.namedItem('descricaoCurso') as HTMLInputElement;

        if (!nomeCursoInput.value || !nomeProfessorInput.value || !areaCursoInput.value || !descricaoCursoInput.value) {
            if (messageTimeoutRef.current) {
                clearTimeout(messageTimeoutRef.current);
            }

            setShowSuccessMessage(false);
            setErrorMessage("Por favor, preencha todos os campos.");

             messageTimeoutRef.current = setTimeout(() => {
                 setErrorMessage(null);
             }, 5000);

            console.log('Validação falhou: campos vazios');
            return;
        }

        console.log('Validação passou: campos preenchidos');

         if (messageTimeoutRef.current) {
             clearTimeout(messageTimeoutRef.current);
         }

        setErrorMessage(null);
        setShowSuccessMessage(true);

        messageTimeoutRef.current = setTimeout(() => {
            setShowSuccessMessage(false);
        }, 5000);

    };

     useEffect(() => {
         return () => {
             if (messageTimeoutRef.current) {
                 clearTimeout(messageTimeoutRef.current);
             }
         };
     }, []);


    return (
        <>
            <NavigationBar />
            <PageLayout>
                <div className="container mt-3">
                    {showSuccessMessage && (
                         <div className="alert alert-success alert-dismissible fade show" role="alert">
                           Curso cadastrado com sucesso visualmente!
                           <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setShowSuccessMessage(false)}></button>
                         </div>
                    )}
                    {errorMessage && (
                         <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            {errorMessage}
                           <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setErrorMessage(null)}></button>
                         </div>
                    )}
                </div>

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