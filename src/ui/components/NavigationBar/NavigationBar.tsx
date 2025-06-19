import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavbarBS from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

interface NavigationBarProps {
  brandText?: string;
  brandLink?: string;
  navLinks?: Array<{ text: string; href: string; }>;
  logoutLink?: string;
  logoutText?: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  brandText = "Ai Chaves",
  brandLink = "/home",
  navLinks = [
    { text: "Sobre", href: "#sobre" },
    { text: "Contato", href: "#contato" },
    { text: "Cursos", href: "#cursos" }
  ],
  logoutLink = "/login",
  logoutText = "Logout"
}) => {
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
        <NavbarBS.Brand as={Link} to={brandLink}>{brandText}</NavbarBS.Brand>

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
              {navLinks.map((link, index) => (
                <Nav.Link key={index} as={Link} to={link.href} className="mx-2">{link.text}</Nav.Link>
              ))}
            </Nav>
          </Offcanvas.Body>
        </NavbarBS.Offcanvas>

        <div className="d-none d-lg-flex ms-auto">
          <Link to={logoutLink} className="text-decoration-none">
            <Button
              variant="outline-light"
              className="rounded-pill px-4 text-white"
            >
              {logoutText}
            </Button>
          </Link>
        </div>
      </Container>
    </NavbarBS>
  );
};

export default NavigationBar;

