"use client";

import { Navbar, Container, Nav } from "react-bootstrap";


export default function NavbarClient() {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Nav className="mx-auto">
                    <Nav.Link>Home</Nav.Link>
                    <Nav.Link>Features</Nav.Link>
                    <Nav.Link>Pricing</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}
