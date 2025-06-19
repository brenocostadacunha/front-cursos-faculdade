import React from 'react';

interface CourseFormProps {
  title: string;
  fields: Array<{ label: string; id: string; placeholder: string; type: string; }>;
  buttonText: string;
  onSubmit: (event: React.FormEvent) => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ title, fields, buttonText, onSubmit }) => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">{title}</h2>
      <div className="card mb-5">
        <div className="card-body text-dark">
          <h4 className="card-title text-center mb-3">{title}</h4>
          <hr className="border-dark mb-4" />
          <form onSubmit={onSubmit}>
            {fields.map((field, index) => (
              <div className="row mb-3" key={index}>
                <label htmlFor={field.id} className="col-sm-4 col-form-label text-end">{field.label}</label>
                <div className="col-sm-8">
                  <input type={field.type} className="form-control" id={field.id} placeholder={field.placeholder} />
                </div>
              </div>
            ))}
            <div className="row">
              <div className="col-sm-8 offset-sm-4 text-end">
                <button type="submit" className="btn btn-primary">{buttonText}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseForm;

