import React from 'react';

interface CursoCadastroFormProps {
  formData: {
    nomeCurso: string;
    nomeProfessor: string;
    areaCurso: string;
    descricaoCurso: string;
  };
  onChange: (data: Partial<CursoCadastroFormProps['formData']>) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitting: boolean;
}

const CursoCadastroForm: React.FC<CursoCadastroFormProps> = ({ formData, onChange, onSubmit, submitting }) => (
  <form onSubmit={onSubmit}>
    <div className="row mb-3">
      <label htmlFor="nomeCurso" className="col-sm-4 col-form-label text-end">Nome do Curso:</label>
      <div className="col-sm-8">
        <input
          type="text"
          className="form-control"
          id="nomeCurso"
          placeholder="exemplo de curso:"
          value={formData.nomeCurso}
          onChange={e => onChange({ nomeCurso: e.target.value })}
        />
      </div>
    </div>
    <div className="row mb-3">
      <label htmlFor="nomeProfessor" className="col-sm-4 col-form-label text-end">Nome do Professor:</label>
      <div className="col-sm-8">
        <input
          type="text"
          className="form-control"
          id="nomeProfessor"
          placeholder="exemplo de professor:"
          value={formData.nomeProfessor}
          onChange={e => onChange({ nomeProfessor: e.target.value })}
        />
      </div>
    </div>
    <div className="row mb-3">
      <label htmlFor="areaCurso" className="col-sm-4 col-form-label text-end">Área do Curso:</label>
      <div className="col-sm-8">
        <input
          type="text"
          className="form-control"
          id="areaCurso"
          placeholder="exemplo de área:"
          value={formData.areaCurso}
          onChange={e => onChange({ areaCurso: e.target.value })}
        />
      </div>
    </div>
    <div className="row mb-4">
      <label htmlFor="descricaoCurso" className="col-sm-4 col-form-label text-end">Descrição do Curso:</label>
      <div className="col-sm-8">
        <input
          type="text"
          className="form-control"
          id="descricaoCurso"
          placeholder="exemplo de descrição:"
          value={formData.descricaoCurso}
          onChange={e => onChange({ descricaoCurso: e.target.value })}
        />
      </div>
    </div>
    <div className="row">
      <div className="col-sm-8 offset-sm-4 text-end">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Adicionando...' : 'Add'}
        </button>
      </div>
    </div>
  </form>
);

export default CursoCadastroForm; 