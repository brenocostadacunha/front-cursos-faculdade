
import NavigationBar from '../navbar/navbar';

const cursosExemplo = [
    { id: 1, nomeCurso: 'React Native', nomeProfessor: 'Mestre Jalin Rabei', areaCurso: 'T.I', aluno: 'Julio Silva' },
    { id: 2, nomeCurso: 'Java', nomeProfessor: 'Mestre Jalin Rabei', areaCurso: 'T.I', aluno: 'Julio Silva' },
    { id: 3, nomeCurso: 'Mecânica de Caminhões', nomeProfessor: 'Mestre Jalin Rabei', areaCurso: 'Indústria e Manutenção', aluno: 'Julio Silva' },
    { id: 4, nomeCurso: 'Pintura', nomeProfessor: 'Elma Maria', areaCurso: 'Artes', aluno: 'Julio Silva' },
];

function TelaListaCursos() {
    return (
        <>
            <NavigationBar />

            <div className="container my-5 mt-5">
                <h2 className="text-center mb-4">Cadastro de Curso</h2>

                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title text-center mb-3">Editar Curso</h4>
                        <hr className="border-dark mb-4" />

                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Nome do Curso</th>
                                        <th scope="col">Nome do Professor</th>
                                        <th scope="col">Área do Curso</th>
                                        <th scope="col">Aluno no Curso</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cursosExemplo.map(curso => (
                                        <tr key={curso.id}>
                                            <td>{curso.nomeCurso}</td>
                                            <td>{curso.nomeProfessor}</td>
                                            <td>{curso.areaCurso}</td>
                                            <td><span role="img" aria-label="ícone de pessoa">👤</span> {curso.aluno}</td>
                                            <td>
                                                <button className="btn btn-danger btn-sm">Delete</button>
                                            </td>
                                            <td>
                                                <button className="btn btn-success btn-sm">Edit</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TelaListaCursos;