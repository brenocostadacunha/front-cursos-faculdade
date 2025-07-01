import React, { useState } from 'react';
import NavigationBar from '../../ui/components/Layout/NavigationBar';
import ListaCursosTable from '../../ui/components/Curso/ListaCursosTable';

const cursosExemplo = [
    { id: 1, nomeCurso: 'React Native', nomeProfessor: 'Mestre Jalin Rabei', areaCurso: 'T.I', aluno: 'Julio Silva' },
    { id: 2, nomeCurso: 'Java', nomeProfessor: 'Mestre Jalin Rabei', areaCurso: 'T.I', aluno: 'Julio Silva' },
    { id: 3, nomeCurso: 'Mecânica de Caminhões', nomeProfessor: 'Mestre Jalin Rabei', areaCurso: 'Indústria e Manutenção', aluno: 'Julio Silva' },
    { id: 4, nomeCurso: 'Pintura', nomeProfessor: 'Elma Maria', areaCurso: 'Artes', aluno: 'Julio Silva' },
];

function TelaListaCursos() {
    const [cursos, setCursos] = useState(cursosExemplo);

    const handleEdit = (curso: typeof cursosExemplo[0]) => {
        // lógica de edição
        alert(`Editar curso: ${curso.nomeCurso}`);
    };
    const handleDelete = (curso: typeof cursosExemplo[0]) => {
        // lógica de exclusão
        setCursos(prev => prev.filter(c => c.id !== curso.id));
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
                    <h2 className="text-center mb-4">Cursos Cadastrados</h2>
                    <div className="card">
                        <div className="card-body text-dark">
                            <h4 className="card-title text-center mb-3">Lista de Cursos Disponíveis</h4> 
                            <hr className="border-dark mb-4" />
                            <ListaCursosTable cursos={cursos} onEdit={handleEdit} onDelete={handleDelete} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TelaListaCursos;