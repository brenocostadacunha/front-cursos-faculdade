import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import heroImage from '../../assets/image/oGrandeMestre.png';
import NavigationBar from '../navbar/navbar';

const PaginaPrincipal: React.FC = () => {
  return (
    <>
      <NavigationBar />
      <div
        className="hero-gradient-background text-white py-5 d-flex align-items-center pt-6" 
        style={{
           minHeight: '100vh',
           
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col lg={6} md={12} className="position-relative">
              <h1 className="display-3 fw-bold mb-4">O Grande Mestre <br />Do Cadastro</h1>
              <p className="fs-5 mb-4 pe-lg-5">
                Cansado da bagunça de cadastrar cursos, turmas e áreas?
                Liberte o poder da organização! Com **O Grande Mestre Do Cadastro**,
                gerenciar seus dados educacionais é tão fácil que parece trapaça (no bom sentido!).
                Diga adeus às planilhas e olá para a maestria!
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/cursos/cadastro">
                  <Button
                    variant="danger"
                    size="lg"
                    className="rounded-2 px-4 py-2 fw-semibold"
                    style={{ backgroundColor: '#ff4d8d', border: 'none', color: 'white' }}
                  >
                    Cadastrar Novo Curso
                  </Button>
                </Link>
                <Link to="/cursos/lista">
                  <Button
                    variant="success"
                    size="lg"
                    className="rounded-2 px-4 py-2 fw-semibold"
                  >
                    Ver/Editar Cursos
                  </Button>
                </Link>
              </div>
            </Col>
            <Col lg={6} md={12} className="mt-4 mt-lg-0  position-relative">
              <img src={heroImage} alt="Hero Illustration" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default PaginaPrincipal;