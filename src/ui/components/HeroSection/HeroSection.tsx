import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import heroImage from "../../../assets/image/oGrandeMestre.png";

interface HeroSectionProps {
  title: string;
  description: string;
  cadastroLink: string;
  listaLink: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, description, cadastroLink, listaLink }) => {
  return (
    <div
      className="hero-gradient-background text-white py-5 d-flex align-items-center pt-6"
      style={{
        minHeight: '100vh',
      }}
    >
      <Container>
        <Row className="align-items-center">
          <Col lg={6} md={12} className="position-relative">
            <h1 className="display-3 fw-bold mb-4">{title}</h1>
            <p className="fs-5 mb-4 pe-lg-5">
              {description}
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Link to={cadastroLink}>
                <Button
                  variant="danger"
                  size="lg"
                  className="rounded-2 px-4 py-2 fw-semibold"
                  style={{ backgroundColor: '#ff4d8d', border: 'none', color: 'white' }}
                >
                  Cadastrar Novo Curso
                </Button>
              </Link>
              <Link to={listaLink}>
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
  );
};

export default HeroSection;

