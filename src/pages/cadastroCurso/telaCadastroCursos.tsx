
import NavigationBar from '../navbar/navbar';

function TelaCadastroCurso() {
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
                            <form>
                                <div className="row mb-3">
                                    <label htmlFor="nomeCurso" className="col-sm-4 col-form-label text-end">Nome do Curso:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="nomeCurso" placeholder="exemplo de curso:" />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label htmlFor="nomeProfessor" className="col-sm-4 col-form-label text-end">Nome do Professor:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="nomeProfessor" placeholder="exemplo de curso:" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="areaCurso" className="col-sm-4 col-form-label text-end">Área do Curso:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="areaCurso" placeholder="exemplo de curso:" />
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <label htmlFor="descricaoCurso" className="col-sm-4 col-form-label text-end">Descrição do Curso:</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="descricaoCurso" placeholder="exemplo de curso:" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-8 offset-sm-4 text-end">
                                        <button type="submit" className="btn btn-primary">Add</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TelaCadastroCurso;