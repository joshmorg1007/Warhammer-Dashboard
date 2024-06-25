import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';

function NavBar() {
    return (
        <Navbar sticky="top" expand="lg" className="bg-body-tertiary navbar" >
            <Container>
                <Navbar.Brand href="/">Warhammer Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to={"/"}>
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={"/armies"}>
                            <Nav.Link>Armies</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={"/Match/Input"}>
                            <Nav.Link>Input Match</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;