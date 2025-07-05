import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand to="/">
            <strong>Centrum gier</strong>
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/game/Familiada" className="nav-link">
              Familiada
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/settings/familiada/SettingsFamiliada"
              className="nav-link"
            >
              Familiada Ustawienia
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
