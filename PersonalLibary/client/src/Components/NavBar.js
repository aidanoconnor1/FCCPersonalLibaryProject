import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'


export const NavBar = () => (
    <Navbar bg="primary" variant="dark" expand="lg" fixed="top">
        <Navbar.Brand href="/">Personal Libary</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="https://github.com/aidanoconnor1/FCCPersonalLibaryProject">Github Repo</Nav.Link>
            <Nav.Link href="https://www.freecodecamp.org/learn/information-security-and-quality-assurance/information-security-and-quality-assurance-projects/personal-library">About</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
)

