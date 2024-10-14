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
                        <Nav.Link href="/">首页</Nav.Link>
                        <NavDropdown title="买家中心" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/checkOut" onClick={handleClick}>
                                购物车
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/myOrders" onClick={handleClick}>
                                我的订单
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/myHistory" onClick={handleClick}>
                                我的足迹
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Favorite" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#" onClick={handleClick}>
                                Favorite items
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#" onClick={handleClick}>
                                Favorite stores
                            </NavDropdown.Item>

                        </NavDropdown>

                        <NavDropdown title="Account" id="navbarScrollingDropdown">
                            {isAuthenticated ? (
                                <NavDropdown.Item onClick={handleLogout}>登出</NavDropdown.Item>
                            ) : (
                                <NavDropdown.Item href="../../login">登入</NavDropdown.Item>
                            )}
                            <NavDropdown.Item href="/register">
                                注册
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/changePassword" onClick={handleClick}>
                                修改密码
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/forgetPassword">
                                忘记密码
                            </NavDropdown.Item>
                            {/* <NavDropdown.Item href="/resetPassword" onClick={handleClick}>
                                重置密码
                            </NavDropdown.Item> */}
                        </NavDropdown>
                        <NavDropdown title="卖家中心" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/displayProduct" onClick={handleClick}>
                                发布新品
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/myPublishedProduct" onClick={handleClick}>
                                我的商品
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#">
                            帮助中心
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