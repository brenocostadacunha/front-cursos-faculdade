import React, { useState } from 'react';
import NavigationBar from '../../ui/components/Layout/NavigationBar';
import CursoCadastroForm from '../../ui/components/Curso/CursoCadastroForm';

function TelaCadastroCurso() {
    const [formData, setFormData] = useState({
        nomeCurso: '',
        nomeProfessor: '',
        areaCurso: '',
        descricaoCurso: ''
    });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (data: Partial<typeof formData>) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        // Aqui você pode adicionar a lógica de envio para API
        setTimeout(() => {
            setSubmitting(false);
            setFormData({ nomeCurso: '', nomeProfessor: '', areaCurso: '', descricaoCurso: '' });
            // Exibir mensagem de sucesso se desejar
        }, 1000);
    };

    return (
        <>
            <NavigationBar />
            <div
                className="hero-gradient-background text-white py-5" 
                style={{
                   minHeight: '100vh', 
                }}
            >
                <div className="container my-5"> 
                    <h2 className="text-center mb-4">Cadastro de Curso</h2>
                    <div className="card mb-5">
                        <div className="card-body text-dark">
                            <h4 className="card-title text-center mb-3">Adicionar novo curso</h4>
                            <hr className="border-dark mb-4" />
                            <CursoCadastroForm
                                formData={formData}
                                onChange={handleChange}
                                onSubmit={handleSubmit}
                                submitting={submitting}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TelaCadastroCurso;