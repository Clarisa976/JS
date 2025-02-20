import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import ProductComponent from './components/ProductComponent';
import Login from "./components/LoginComponent";
import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';
//import { PIELES } from '../src/data/Pieles';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      //productos: PIELES.productos,
      productos: [],
      cart: [],
      showCart: false,
      showPurchaseModal: false,
      alertMessage: "",
      alertColor: "danger",
      name: "",
      address: "",
    };
  }

  componentDidMount() {
    // Usamos axios para hacer la llamada a la URL
    axios.get('/2daw/pieles.json')
      .then(response => {
        this.setState({ productos: response.data.productos });
      })
      .catch(error => console.error('Error fetching data with axios:', error));
  }



  toggleModal = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  toggleCart = () => {
    this.setState(prevState => ({ showCart: !prevState.showCart }));
  };
  togglePurchaseModal = () => {
    this.setState(prevState => ({ showPurchaseModal: !prevState.showPurchaseModal }));
  };

  addToCart = (producto, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    this.setState(prevState => {
      const cart = [...prevState.cart];
      const identifier = producto.id !== undefined ? producto.id : producto.nombre;
      const index = cart.findIndex(item => {
        const itemId = item.id !== undefined ? item.id : item.nombre;
        return itemId === identifier;
      });
      if (index > -1) {
        const updatedItem = { ...cart[index], quantity: cart[index].quantity + 1 };
        return { cart: [...cart.slice(0, index), updatedItem, ...cart.slice(index + 1)] };
      } else {
        return {
          cart: [...cart, {
            id: identifier,
            nombre: producto.nombre,
            precio: producto.precio,
            quantity: 1
          }]
        };
      }
    });
  };


  modifyCart = (id, change) => {
    this.setState(prevState => {
      const cart = prevState.cart
        .map(item => {
          if (item.id === id) {
            const newQuantity = item.quantity + change;
            return { ...item, quantity: newQuantity < 0 ? 0 : newQuantity };
          }
          return item;
        })
        .filter(item => item.quantity > 0);//si están a 0 se quitan del carro
      return { cart };
    });
  };


  purchase = (name, address) => {
    const { cart } = this.state;
    if (cart.length === 0) {
      this.setState({
        showAlert: true,
        alertMessage: "There are no products in the cart",
        alertColor: "danger"
      });
      return;
    }
    console.log("Compra realizada:", { name, address, items: cart });
    this.setState({ cart: [] });
    this.setState({
      showAlert: true,
      alertMessage: "Purchase completed!",
      alertColor: "success"
    });
  };
  handlePurchase = () => {
    const name = this.nameInput.value;
    const address = this.addressInput.value;
    if (name.trim() && address.trim()) {
      this.purchase(name, address);
      this.togglePurchaseModal();
    } else {
      this.setState({
        showAlert: true,
        alertMessage: "Empty field",
        alertColor: "danger"
      });
    }
  };

  render() {
    const totalItems = this.state.cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
      <>
        <div className="App">
          <HeaderComponent
            productos={this.state.productos}
            toggleCart={this.toggleCart}
            cartItemCount={totalItems}
          />
          <Login show={this.state.isOpen} toggle={this.toggleModal} />
        </div>

        <Modal isOpen={this.state.showCart} toggle={this.toggleCart}>
          <ModalHeader toggle={this.toggleCart}>Shopping Cart</ModalHeader>
          <ModalBody>
            {this.state.cart.length === 0 ? (
              <p>No products in cart</p>
            ) : (
              this.state.cart.map(item => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '10px'
                  }}>
                  <span style={{ flex: '2' }}>{item.nombre}</span>
                  <span style={{ flex: '3', textAlign: 'center' }}>
                    {item.quantity} x {item.precio}€ = {item.quantity * item.precio}€
                  </span>
                  <span style={{ flex: '1', textAlign: 'center' }}>
                    <Button color="primary" size="sm" onClick={() => this.modifyCart(item.id, 1)}>+</Button>{' '}
                    <Button color="secondary" size="sm" onClick={() => this.modifyCart(item.id, -1)}>-</Button>
                  </span>
                </div>
              ))
            )}
            <hr />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <h4>
                Total: {this.state.cart.reduce((acc, item) => acc + item.quantity * item.precio, 0)}€
              </h4>
            </div>
            <hr />

            <h5>Fill in your details to complete the purchase:</h5>
            <div>
              <label>Name:</label><br />
              <input
                type="text"
                onChange={this.handleChange}
                placeholder="Enter your name"
                name="name"
              />
              <br /><br />
            </div>
            <div>
              <label>Address:</label><br />
              <input
                type="text"
                onChange={this.handleChange}
                placeholder="Enter your address"
                name="address"
              />
              <br /><br />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <h4>
                Your order total is: {this.state.cart.reduce((acc, item) => acc + item.quantity * item.precio, 0)}€
              </h4>
            </div>
            {this.state.showAlert && (
              <Alert color={this.state.alertColor} toggle={() => this.setState({ showAlert: false, alertMessage: "" })}>
                {this.state.alertMessage}
              </Alert>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.handlePurchase}>Purchase</Button>
            <Button color="secondary" onClick={this.toggleCart}>Close</Button>
          </ModalFooter>
        </Modal>



        <h1>Products</h1>
        <hr />
        <ProductComponent productos={this.state.productos} addToCart={this.addToCart} />
        <FooterComponent />
      </>
    );
  }
}



export default App;