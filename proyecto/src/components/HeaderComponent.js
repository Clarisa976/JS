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
    DropdownItem
} from 'reactstrap';
import { PIELES } from '../datos/Pieles.js';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    // Construir el array de categorías y subcategorías sin duplicados
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
        <Navbar dark expand="md" className="mb-3 bg-dark">
            <div className="container">
                <NavbarBrand href="/">Proyecto REACT</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {categorias.map((cat, index) =>
                            cat.subcategorias.length > 0 ? (
                                <UncontrolledDropdown nav inNavbar key={index}>
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
                                <NavItem key={index}>
                                    <NavLink href={`/categoria/${cat.nombre}`}>{cat.nombre}</NavLink>
                                </NavItem>
                            )
                        )}
                    </Nav>
                </Collapse>
            </div>
        </Navbar>
    );
};

export default Header;