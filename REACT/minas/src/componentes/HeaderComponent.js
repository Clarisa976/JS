import { Navbar,NavbarBrand } from 'reactstrap';

const Header = ()=>{
    return(
        <Navbar dark color="primary">
        <div className="container">
            <div className="row justify-content-center">
            <NavbarBrand href="/">SKIP THE MINE. DEMETER PROJECT</NavbarBrand>
            </div>
        </div>
        </Navbar>
    );
}
export default Header;
