"use client";

import { Navbar, Container, Nav } from "react-bootstrap";
import Link from "next/link";

export default function NavbarClient() {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Nav className="mx-auto">
                    <Nav.Link as={Link} href="/tasks">Tasks</Nav.Link>
                    <Nav.Link as={Link} href="/work-reports">Work reports</Nav.Link>
                    <Nav.Link as={Link} href="/workouts">Workouts</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}
