"use client";

import { Navbar, Container, Nav, Button } from "react-bootstrap";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import "./nav.css";

export default function NavbarClient() {
    const { data: session, status } = useSession();

    return (
        <Navbar variant="dark" expand="lg" fixed="top" className="shadow-sm navbar-dark-styled">
            <Container>
                <Navbar.Brand as={Link} href="/" >
                    Life Organizer
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto d-flex justify-content-start flex-grow-1">
                        <Nav.Link as={Link} href="/tasks" className="mx-2">
                            Tasks
                        </Nav.Link>
                        <Nav.Link as={Link} href="/workreports" className="mx-2">
                            Work Reports
                        </Nav.Link>
                        <Nav.Link as={Link} href="/workouts" className="mx-2">
                            Workouts
                        </Nav.Link>
                        <Nav.Link as={Link} href="/notes" className="mx-2">
                            Notes
                        </Nav.Link>
                    </Nav>
                    <Nav className="align-items-center">
                        {status === "loading" ? (
                            <div className="spinner-border spinner-border-sm text-light" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        ) : session ? (
                            <div className="d-flex align-items-center gap-3">
                                {session.user?.image && (
                                    <Image
                                        src={session.user.image}
                                        alt={session.user.name || "User"}
                                        width={32}
                                        height={32}
                                        className="rounded-circle"
                                    />
                                )}
                                <span className="text-light">
                                    {session.user?.name}
                                </span>
                                <Button
                                    variant="outline-light"
                                    onClick={() => signOut()}
                                    size="sm"
                                >
                                    Sign Out
                                </Button>
                            </div>
                        ) : (
                            <Button
                                variant="light"
                                onClick={() => signIn("google")}
                                className="d-flex align-items-center gap-2"
                                size="sm"
                            >
                                <svg width="18" height="18" viewBox="0 0 18 18">
                                    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" />
                                    <path fill="#34A853" d="M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" />
                                    <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" />
                                    <path fill="#EA4335" d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.428 0 9.002 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" />
                                </svg>
                                Sign in with Google
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
