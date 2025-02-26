import React from 'react';
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
import logo from '../img/logo2.png';

const HeaderComponent = ({ productos, toggleCart, cartItemCount, loggedUser, onLogout, onOpenLogin, onOpenPedidos }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // Mapeo de categorías
  const categoryMapping = {
    'Scraps': 'Scraps',
    'Leather remnants': 'Scraps',
    'Cowhides': 'Cow',
    'Cowhide': 'Cow',
    'Pig Lining': 'Pig',
    'Pig lining': 'Pig',
    'Pigskin Lining': 'Pig',
    'Leather Straps for Handles': 'Handles & Accessories',
    'Leather Handles': 'Handles & Accessories',
    'Adhesives': 'Dyes & Adhesives',
    'Finishes': 'Dyes & Adhesives',
    'Dyes': 'Dyes & Adhesives',
    'Edge Dyes': 'Dyes & Adhesives'
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
          {/* Hamburger for mobile */}
          <div className="hamburger d-md-none">
            <NavbarToggler onClick={toggle} />
          </div>
          {/* Logo */}
          <div className="titulo" style={{ flexGrow: 1, textAlign: 'center' }}>
            <NavbarBrand className="m-0" onClick={() => window.location.reload()}>
              <img src={logo} alt="Logo" style={{ height: '80px', width: 'auto' }} />
            </NavbarBrand>

          </div>
          {/* Desktop Login / User Dropdown */}
          <div className="login d-none d-md-flex align-items-center">
            {loggedUser ? (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret style={{ display: 'flex', alignItems: 'center' }}>
                <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAQJJREFUSEvFVIENwjAMcz6BS2CfwCXAJfAJ+4RxSZilFW1dm5R1E5EmTWplN45jwcYlG+OjiEBVdwAuAE791wFoAdxEhP9muQSqegTwTKAQ/CwiJMtWCcELADtIVSci+8UEqkpJ7o4KjdWF2YGqXgftLQ7OgveS5RHk9B+DcQ6PpQTUngPeZgZ8leEiHpv684LrooEk7AElYwWL1u+Bt0jeeVEHHkjNHtB+hz4agjRjrBAZ759tOgyWC5ZzT/zobGzMJHJc46k1c1WKwMoej2CWTROCwmjwSCbRERNQdwZcTbUi0gSAmKBGnoA5kSkm0Jqnf1/d+zbZwRrgMcZ/N3mNjj45MFsZKcZxbQAAAABJRU5ErkJggg=="
                    alt="user icon"
                    style={{ marginRight: '0.5rem' }}
                  />
                  <span style={{ color: 'white' }}>{loggedUser.usuario}</span>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={(e) => { e.preventDefault(); onOpenPedidos(); }}>
                    My Orders
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => {
                    onLogout();
                    window.location.reload();
                  }}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <Button color="primary" onClick={onOpenLogin}>
               <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAQJJREFUSEvFVIENwjAMcz6BS2CfwCXAJfAJ+4RxSZilFW1dm5R1E5EmTWplN45jwcYlG+OjiEBVdwAuAE791wFoAdxEhP9muQSqegTwTKAQ/CwiJMtWCcELADtIVSci+8UEqkpJ7o4KjdWF2YGqXgftLQ7OgveS5RHk9B+DcQ6PpQTUngPeZgZ8leEiHpv684LrooEk7AElYwWL1u+Bt0jeeVEHHkjNHtB+hz4agjRjrBAZ759tOgyWC5ZzT/zobGzMJHJc46k1c1WKwMoej2CWTROCwmjwSCbRERNQdwZcTbUi0gSAmKBGnoA5kSkm0Jqnf1/d+zbZwRrgMcZ/N3mNjj45MFsZKcZxbQAAAABJRU5ErkJggg=="
                  alt="user icon"
                />
              </Button>
            )}
          </div>
          {/* Mobile Login */}
          <div className="login d-md-none">
            <Button color="primary" onClick={loggedUser ? onOpenPedidos : onOpenLogin}>
              {loggedUser ? (
                <span style={{ color: 'white' }}>{loggedUser.usuario}</span>
              ) : (
               <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAQJJREFUSEvFVIENwjAMcz6BS2CfwCXAJfAJ+4RxSZilFW1dm5R1E5EmTWplN45jwcYlG+OjiEBVdwAuAE791wFoAdxEhP9muQSqegTwTKAQ/CwiJMtWCcELADtIVSci+8UEqkpJ7o4KjdWF2YGqXgftLQ7OgveS5RHk9B+DcQ6PpQTUngPeZgZ8leEiHpv684LrooEk7AElYwWL1u+Bt0jeeVEHHkjNHtB+hz4agjRjrBAZ759tOgyWC5ZzT/zobGzMJHJc46k1c1WKwMoej2CWTROCwmjwSCbRERNQdwZcTbUi0gSAmKBGnoA5kSkm0Jqnf1/d+zbZwRrgMcZ/N3mNjj45MFsZKcZxbQAAAABJRU5ErkJggg=="
                  alt="user icon"
                />
              )}
            </Button>
          </div>
          {/* Cart */}
          <div className="cart">
            <Button color="success" onClick={toggleCart}>
            <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAShJREFUSEvNlb1Vw0AQhOfLXQQO6QKXAREOCSCBHCiABDISTEQZuAtCXAT5oOXpeIdsyecz4nGhdNrZ+dkVGvkwcn39HYBtt2xWkp6Bm99g980gA0h1Z8ByX5A1iWyfSnqStARmYwAcSHpvC+/NYqPJtoNBMKk9K2AaH/cB5CxqQIYBoqLt18aHo5rqTeO3KYW9c5CZXYMxBSLu/YNmu1amBTBPXQ1OcjN7MWzXO1KYA4tSgJ1Z0IifN7R1F+1o9g95Bj1IXdiOJEWiSs7aYG5l0Ea2xIuNq6UU4BB4sz0BPnIq6ZntrztdmqUA95LOJb0AJ5l8E0mPko4lPQAXtQDpX6FuSvI1331XanJ0GR5cdrsMWSSdtezuGvmuqhiUxKfvTpEH/xrgE9prchlIVheaAAAAAElFTkSuQmCC"
                alt="cart icon"
              />
              {cartItemCount > 0 && <span>({cartItemCount})</span>}
            </Button>
          </div>
        </div>
        {/* Desktop Navigation Menu */}
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
      {/* Mobile Navigation Menu */}
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
    </Navbar>
  );
};

export default HeaderComponent;
