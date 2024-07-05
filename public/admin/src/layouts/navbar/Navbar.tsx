import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { Outlet } from "react-router";

export function NavbarLayout() {
	return (
		<>
			<Navbar expand="lg" className="bg-body-tertiary">
				<Container fluid>
					<Navbar.Brand href="#home">
						<img className="center logo" src="/logoIcon.svg" alt="GameMind" />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link href="/dashboard/home/users">Inicio</Nav.Link>
							<Nav.Link href="/dashboard/league/clubs">Liga</Nav.Link>
							<Nav.Link href="/dashboard/tournaments">Torneos</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<Outlet />
		</>
	);
}
