"use client";

import { Navbar, Container, Nav } from "react-bootstrap";


export default function NavbarClient() {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Nav className="mx-auto">
                    <Nav.Link>Tasks</Nav.Link>
                    <Nav.Link>Work reports</Nav.Link>
                    <Nav.Link>Workouts</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}
