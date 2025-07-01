import React from 'react';

interface CursoExemplo {
  id: number;
  nomeCurso: string;
  nomeProfessor: string;
  areaCurso: string;
  aluno: string;
}

interface ListaCursosTableProps {
  cursos: CursoExemplo[];
  onEdit: (curso: CursoExemplo) => void;
  onDelete: (curso: CursoExemplo) => void;
}

const ListaCursosTable: React.FC<ListaCursosTableProps> = ({ cursos, onEdit, onDelete }) => (
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
        {cursos.map(curso => (
          <tr key={curso.id}>
            <td>{curso.nomeCurso}</td>
            <td>{curso.nomeProfessor}</td>
            <td>{curso.areaCurso}</td>
            <td><span role="img" aria-label="ícone de pessoa">👤</span> {curso.aluno}</td>
            <td>
              <button className="btn btn-danger btn-sm" onClick={() => onDelete(curso)}>Delete</button>
            </td>
            <td>
              <button className="btn btn-success btn-sm" onClick={() => onEdit(curso)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ListaCursosTable; 