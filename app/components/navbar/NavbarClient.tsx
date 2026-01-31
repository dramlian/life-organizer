"use client";

import { Navbar, Container, Nav, Button } from "react-bootstrap";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function NavbarClient() {
    const { data: session, status } = useSession();

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Nav className="mx-auto">
                    <Nav.Link as={Link} href="/tasks">Tasks</Nav.Link>
                    <Nav.Link as={Link} href="/workreports">Work reports</Nav.Link>
                    <Nav.Link as={Link} href="/workouts">Workouts</Nav.Link>
                </Nav>
                <Nav className="ms-auto">
                    {status === "loading" ? (
                        <span className="text-light">Loading...</span>
                    ) : session ? (
                        <>
                            <span className="text-light me-3">
                                {session.user?.name}
                            </span>
                            <Button
                                variant="outline-light"
                                onClick={() => signOut()}
                                size="sm"
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="outline-light"
                            onClick={() => signIn("google")}
                            size="sm"
                        >
                            Login with Google
                        </Button>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}
