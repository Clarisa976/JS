import React, { useState, useEffect } from 'react';
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
import Login from './LoginComponent';
import logo from '../img/logo2.png';


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [productos, setProductos] = useState([]);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const toggleLoginModal = () => setLoginModalOpen(!loginModalOpen);

  // Mapeo de las categorías originales a categorías de navegación en inglés
  const categoryMapping = {
    'Scraps': 'Leather Scraps',
    'Leather remnants': 'Leather Scraps',
    'Cowhides': 'Cow',
    'Cowhide': 'Cow',
    'Pig Lining': 'Pig',
    'Pigskin Lining': 'Pig',
    'Leather Straps for Handles': 'Handles & Accessories',
    'Leather Handles': 'Handles & Accessories',
    'Adhesives': 'Adhesives',
    'Finishes': 'Finishes',
    'Dyes': 'Dyes',
    'Edge Dyes': 'Dyes'
  };

  useEffect(() => {
    fetch('https://icarosproject.com/2daw/pieles.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error al traer datos: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setProductos(data.productos);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  let navCategories = {};

  productos.forEach(producto => {
    if (!producto.categoria) return;
    const originalCat = producto.categoria;
    // Se asigna la main category usando el mapping (o se conserva la original si no está mapeada)
    const mainCat = categoryMapping[originalCat] || originalCat;

    if (!navCategories[mainCat]) {
      navCategories[mainCat] = { subcategories: [] };
    }
    // Si la subcategoría (original) aún no se agregó, la añadimos
    if (!navCategories[mainCat].subcategories.includes(originalCat)) {
      navCategories[mainCat].subcategories.push(originalCat);
    }
  });

  // Convertimos el objeto en un array para mapearlo en JSX
  const navCategoriesArr = Object.keys(navCategories).map(mainCat => ({
    mainCategory: mainCat,
    subcategories: navCategories[mainCat].subcategories
  }));

  return (
    <Navbar dark expand="md" className="mb-3 bg-dark" style={{ position: 'relative' }}>
      <div className="container-fluid">
        <div className="cabecera" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Hamburguesa en mobile */}
          <div className="hamburger d-md-none">
            <NavbarToggler onClick={toggle} />
          </div>
          {/* Título centrado */}
          <div className="titulo" style={{ flexGrow: 1, textAlign: 'center' }}>
            <NavbarBrand className="m-0">
              <img src={logo} alt="Logo" style={{ height: '80px', width: 'auto' }} />
            </NavbarBrand>
          </div>
          {/* Botón de Login a la derecha */}
          <div className="login">
            <Button color="primary" onClick={toggleLoginModal}>
              Login
            </Button>
          </div>
        </div>

        {/* Menú de navegación para desktop: aparece en una línea debajo (solo md y superiores) */}
        <div className="row d-none d-md-block mt-2">
          <div className="col">
            <Nav navbar className="nav-categories desktop-nav">
              {navCategoriesArr.map((cat, index) =>
                cat.subcategories.length > 1 ? (
                  <UncontrolledDropdown nav inNavbar key={index} className="nav-category">
                    <DropdownToggle nav caret>
                      {cat.mainCategory}
                    </DropdownToggle>
                    <DropdownMenu right>
                      {cat.subcategories.map((subcat, i) => (
                        <DropdownItem key={i} href={`/category/${cat.mainCategory}/${subcat}`}>
                          {subcat}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                ) : (
                  <NavItem key={index} className="nav-category">
                    <NavLink href={`/category/${cat.mainCategory}`}>
                      {cat.mainCategory}
                    </NavLink>
                  </NavItem>
                )
              )}
            </Nav>
          </div>
        </div>
      </div>

      {/* Menú de navegación para mobile: se muestra en el Collapse con la clase "mobile-collapse" */}
      <div className="d-md-none mobile-collapse">
        <Collapse isOpen={isOpen} navbar>
          <div className="container-fluid">
            <Nav navbar className="nav-categories">
              {navCategoriesArr.map((cat, index) =>
                cat.subcategories.length > 1 ? (
                  <UncontrolledDropdown nav inNavbar key={index} className="nav-category">
                    <DropdownToggle nav caret>
                      {cat.mainCategory}
                    </DropdownToggle>
                    <DropdownMenu right>
                      {cat.subcategories.map((subcat, i) => (
                        <DropdownItem key={i} href={`/category/${cat.mainCategory}/${subcat}`}>
                          {subcat}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                ) : (
                  <NavItem key={index} className="nav-category">
                    <NavLink href={`/category/${cat.mainCategory}`}>
                      {cat.mainCategory}
                    </NavLink>
                  </NavItem>
                )
              )}
            </Nav>
          </div>
        </Collapse>
      </div>

      <Login show={loginModalOpen} toggle={toggleLoginModal} />
    </Navbar>
  );
};
export default Header;
