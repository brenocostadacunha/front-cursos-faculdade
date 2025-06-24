import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavbarBS from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'; 

function Navbar() {
  const expand = 'lg';

  return (
    <NavbarBS
      key={expand}
      expand={expand}
      className="py-3"
      bg="transparent"
      variant="dark"
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1030,
        backgroundColor: 'transparent',
      }}
    >
      <Container>
        <NavbarBS.Brand as={Link} to="/home">Ai Chaves</NavbarBS.Brand> 

        <NavbarBS.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <NavbarBS.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              AI Chavinho
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link as={Link} to="#sobre" className="mx-2">Sobre</Nav.Link>
              <Nav.Link as={Link} to="#contato" className="mx-2">Contato</Nav.Link>
              <Nav.Link as={Link} to="/cursos/gerenciamento" className="mx-2">Cursos</Nav.Link>
              <Nav.Link as={Link} to="/professores" className="mx-2">Professores</Nav.Link>
              <Nav.Link as={Link} to="/alunos" className="mx-2">Alunos</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </NavbarBS.Offcanvas>

        <div className="d-none d-lg-flex ms-auto">
          <Link to="/login" className="text-decoration-none">
            <Button
              variant="outline-light"
              className="rounded-pill px-4 text-white"
            >
              Logout
            </Button>
          </Link>
        </div>
      </Container>
    </NavbarBS>
  );
}

export default Navbar;