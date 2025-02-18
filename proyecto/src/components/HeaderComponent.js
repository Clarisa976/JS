import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button
} from 'reactstrap';
import { PIELES } from '../data/Pieles.js';
import Login from "./LoginComponent";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const toggleLoginModal = () => setLoginModalOpen(!loginModalOpen);

    const categorias = [];

    PIELES.productos.forEach(producto => {
        if (!producto.categoria) return;

        if (producto.categoria.includes(' > ')) {
            const [categoriaPrincipal, subcategoria] = producto.categoria
                .split(' > ')
                .map(s => s.trim());
            let catExistente = categorias.find(cat => cat.nombre === categoriaPrincipal);
            if (!catExistente) {
                catExistente = { nombre: categoriaPrincipal, subcategorias: [] };
                categorias.push(catExistente);
            }
            if (!catExistente.subcategorias.find(sub => sub === subcategoria)) {
                catExistente.subcategorias.push(subcategoria);
            }
        } else {
            let catExistente = categorias.find(cat => cat.nombre === producto.categoria);
            if (!catExistente) {
                categorias.push({ nombre: producto.categoria, subcategorias: [] });
            }
        }
    });

    return (
        <>
            <Navbar dark expand="md" className="mb-3 bg-dark">
                <div className="container cabecera">
                    <NavbarBrand >Proyecto REACT</NavbarBrand>
                    <NavbarToggler onClick={toggle} className="my-toggler" />
                    <Button color="primary" onClick={toggleLoginModal} className="my-login-btn">
                        Login
                    </Button>
                </div>
                <Collapse isOpen={isOpen} navbar>
                    <div className="container">
                        <Nav navbar className="nav-categorias">
                            {categorias.map((cat, index) =>
                                cat.subcategorias.length > 0 ? (
                                    <UncontrolledDropdown nav inNavbar key={index} className="nav-category">
                                        <DropdownToggle nav caret>
                                            {cat.nombre}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {cat.subcategorias.map((subcat, i) => (
                                                <DropdownItem key={i} href={`/categoria/${cat.nombre}/${subcat}`}>
                                                    {subcat}
                                                </DropdownItem>
                                            ))}
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                ) : (
                                    <NavItem key={index} className="nav-category">
                                        <NavLink href={`/categoria/${cat.nombre}`}>{cat.nombre}</NavLink>
                                    </NavItem>
                                )
                            )}
                        </Nav>
                    </div>
                </Collapse>
            </Navbar>
            <Login show={loginModalOpen} toggle={toggleLoginModal} />
        </>
    );
};

export default Header;