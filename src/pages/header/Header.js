import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const location = useLocation();

  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      sticky="top"
      className="shadow-sm"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
          Centrum Gier
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown
              title="Gry"
              id="games-dropdown"
              menuVariant="dark"
              className="nav-link"
            >
              <NavDropdown.Item
                as={Link}
                to="/game/Familiada"
                active={location.pathname === "/game/Familiada"}
              >
                Familiada
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/game/InnaGra1"
                active={location.pathname === "/game/InnaGra1"}
              >
                Inna Gra 1
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/game/InnaGra2"
                active={location.pathname === "/game/InnaGra2"}
              >
                Inna Gra 2
              </NavDropdown.Item>
              {/* Dodaj więcej gier w razie potrzeby */}
            </NavDropdown>

            <Nav.Link
              as={Link}
              to="/settings/familiada/SettingsFamiliada"
              active={
                location.pathname === "/settings/familiada/SettingsFamiliada"
              }
            >
              Ustawienia Familiady
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
