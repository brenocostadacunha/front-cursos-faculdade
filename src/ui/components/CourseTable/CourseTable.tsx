import React from 'react';

interface CourseTableProps {
  title: string;
  courses: Array<{ id: number; nomeCurso: string; nomeProfessor: string; areaCurso: string; aluno: string; }>;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const CourseTable: React.FC<CourseTableProps> = ({ title, courses, onDelete, onEdit }) => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">{title}</h2>
      <div className="card">
        <div className="card-body text-dark">
          <h4 className="card-title text-center mb-3">{title}</h4>
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
                {courses.map(curso => (
                  <tr key={curso.id}>
                    <td>{curso.nomeCurso}</td>
                    <td>{curso.nomeProfessor}</td>
                    <td>{curso.areaCurso}</td>
                    <td><span role="img" aria-label="ícone de pessoa">👤</span> {curso.aluno}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => onDelete(curso.id)}>Delete</button>
                    </td>
                    <td>
                      <button className="btn btn-success btn-sm" onClick={() => onEdit(curso.id)}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseTable;

