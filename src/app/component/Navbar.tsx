'use client';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
function NavBar() {
    const { isAuthenticated, logout } = useAuth();
    const [expanded, setExpanded] = useState(false);

    const handleLogout = () => {
        logout();
        setExpanded(false);
    };

    const handleClick = (e: React.MouseEvent) => {
        if (!isAuthenticated) {
            e.preventDefault();
            toast.warning('请先登录');
        }
    };
    return (
        <Navbar expanded={expanded} collapseOnSelect expand="md" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll"
                    onClick={() => setExpanded(expanded => !expanded)}
                />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '200px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/shopping">Shopping Home</Nav.Link>
                        <NavDropdown title="Buyer Center" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/checkOut" onClick={handleClick}>
                                Cart
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/myOrders" onClick={handleClick}>
                                Purchase History
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/myHistory" onClick={handleClick}>
                                Browser History
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Account" id="navbarScrollingDropdown">
                            {isAuthenticated ? (
                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            ) : (
                                <NavDropdown.Item href="../../login">Login</NavDropdown.Item>
                            )}
                            <NavDropdown.Item href="/register">
                                Register
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/changePassword" onClick={handleClick}>
                                Change Password
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/forgetPassword">
                                Forget Password
                            </NavDropdown.Item>
                            {/* <NavDropdown.Item href="/resetPassword" onClick={handleClick}>
                                重置密码
                            </NavDropdown.Item> */}
                        </NavDropdown>
                        <NavDropdown title="Seller Center" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/displayProduct" onClick={handleClick}>
                                Publish Product
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/myPublishedProduct" onClick={handleClick}>
                                My Published Product
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/help">
                            Help Center
                        </Nav.Link>
                        <Nav.Link href="/about">
                            About
                        </Nav.Link>
                        <Nav.Link href="/contact">
                            Contact
                        </Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;