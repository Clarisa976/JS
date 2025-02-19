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
import Login from './LoginComponent';
import logo from '../img/logo2.png';


const Header = ({ productos }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const toggleLoginModal = () => setLoginModalOpen(!loginModalOpen);

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

  let navCategories = {};

  productos.forEach(producto => {
    if (!producto.categoria) return;
    const originalCat = producto.categoria;
    const mainCat = categoryMapping[originalCat] || originalCat;

    if (!navCategories[mainCat]) {
      navCategories[mainCat] = { subcategories: [] };
    }
    if (!navCategories[mainCat].subcategories.includes(originalCat)) {
      navCategories[mainCat].subcategories.push(originalCat);
    }
  });

  const navCategoriesArr = Object.keys(navCategories).map(mainCat => ({
    mainCategory: mainCat,
    subcategories: navCategories[mainCat].subcategories
  }));

  return (
    <Navbar dark expand="md" className="mb-3 bg-dark" style={{ position: 'relative' }}>
      <div className="container-fluid">
        <div className="cabecera" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/*Hamburguesa*/}
          <div className="hamburger d-md-none">
            <NavbarToggler onClick={toggle} />
          </div>
          {/*Logo*/}
          <div className="titulo" style={{ flexGrow: 1, textAlign: 'center' }}>
            <NavbarBrand className="m-0">
              <img src={logo} alt="Logo" style={{ height: '80px', width: 'auto' }} />
            </NavbarBrand>
          </div>
          {/*Login*/}
          <div className="login">
            <Button color="primary" onClick={toggleLoginModal}>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAQJJREFUSEvFVIENwjAMcz6BS2CfwCXAJfAJ+4RxSZilFW1dm5R1E5EmTWplN45jwcYlG+OjiEBVdwAuAE791wFoAdxEhP9muQSqegTwTKAQ/CwiJMtWCcELADtIVSci+8UEqkpJ7o4KjdWF2YGqXgftLQ7OgveS5RHk9B+DcQ6PpQTUngPeZgZ8leEiHpv684LrooEk7AElYwWL1u+Bt0jeeVEHHkjNHtB+hz4agjRjrBAZ759tOgyWC5ZzT/zobGzMJHJc46k1c1WKwMoej2CWTROCwmjwSCbRERNQdwZcTbUi0gSAmKBGnoA5kSkm0Jqnf1/d+zbZwRrgMcZ/N3mNjj45MFsZKcZxbQAAAABJRU5ErkJggg==" alt='user icon'/>
            </Button>
          </div>
          <div className="cart">
            <Button color="success" onClick={toggleLoginModal}>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAShJREFUSEvNlb1Vw0AQhOfLXQQO6QKXAREOCSCBHCiABDISTEQZuAtCXAT5oOXpeIdsyecz4nGhdNrZ+dkVGvkwcn39HYBtt2xWkp6Bm99g980gA0h1Z8ByX5A1iWyfSnqStARmYwAcSHpvC+/NYqPJtoNBMKk9K2AaH/cB5CxqQIYBoqLt18aHo5rqTeO3KYW9c5CZXYMxBSLu/YNmu1amBTBPXQ1OcjN7MWzXO1KYA4tSgJ1Z0IifN7R1F+1o9g95Bj1IXdiOJEWiSs7aYG5l0Ea2xIuNq6UU4BB4sz0BPnIq6ZntrztdmqUA95LOJb0AJ5l8E0mPko4lPQAXtQDpX6FuSvI1331XanJ0GR5cdrsMWSSdtezuGvmuqhiUxKfvTpEH/xrgE9prchlIVheaAAAAAElFTkSuQmCC" alt='cart icon'/>
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