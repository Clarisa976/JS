import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import ProductComponent from './components/ProductComponent';
import Login from "./components/LoginComponent";
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginOpen: false,
      showCart: false,
      showPedidosModal: false,
      showAlert: false,
      productos: [],
      cart: [],
      pedidos: [],
      alertMessage: "",
      alertColor: "danger",
      name: "",
      address: "",
      loggedUser: null,
      
    };
  }

  componentDidMount() {
    axios.get('/2daw/pieles.json')
      .then(response => {
        this.setState({ productos: response.data.productos });
      })
      .catch(error => console.error('Error fetching data with axios:', error));
  }

  toggleLoginModal = () => {
    this.setState({ isLoginOpen: !this.state.isLoginOpen });
  };

  toggleCart = () => {
    this.setState(prevState => ({ showCart: !prevState.showCart }));
  };

  togglePedidosModal = () => {
    this.setState(prevState => ({ showPedidosModal: !prevState.showPedidosModal }));
  };

  // Actualiza el usuario logueado
  handleLogin = (user) => {
    console.log("handleLogin called with user:", user);
    this.setState({ loggedUser: user, name: user.usuario }, () => {
      console.log("Logged User updated in state:", this.state.loggedUser);
    });
    this.toggleLoginModal();
  };

  handleLogout = () => {
    this.setState({ loggedUser: null, name: "" });
  };

  addToCart = (producto, e) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
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
        .filter(item => item.quantity > 0);
      return { cart };
    });
  };

  // Procesa la compra: crea un pedido
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
    const newPedido = {
      nombre: name,
      direccion: address,
      pedidos: cart
    };
    console.log("Compra realizada:", newPedido);
    this.setState(prevState => ({
      pedidos: [...prevState.pedidos, newPedido],
      cart: []
    }));
    this.setState({
      showAlert: true,
      alertMessage: "Purchase completed!",
      alertColor: "success"
    });
  };

  handlePurchase = () => {
    if (!this.state.loggedUser) {
      this.setState({
        showAlert: true,
        alertMessage: "You must be logged in to complete a purchase",
        alertColor: "danger"
      });
      return;
    }
    const { name, address } = this.state;
    if (name.trim() && address.trim()) {
      this.purchase(name, address);
      this.toggleCart();
    } else {
      this.setState({
        showAlert: true,
        alertMessage: "Empty field",
        alertColor: "danger"
      });
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Ventana del carrito y formulario para el pedido
  carritoModal = () => {
    const totalPrice = this.state.cart.reduce(
      (acc, item) => acc + item.quantity * item.precio,
      0
    );
    return (
      <Modal
        isOpen={this.state.showCart}
        toggle={this.toggleCart}
        size="xl"
        modalClassName="modal-custom-size"
      >
        <ModalHeader toggle={this.toggleCart}>Shopping Cart</ModalHeader>
        <ModalBody>
          {this.state.cart.length === 0 ? (
            <p>No products in cart</p>
          ) : (
            this.state.cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '10px'
                }}
              >
                <span style={{ flex: '2' }}>{item.nombre}</span>
                <span style={{ flex: '3', textAlign: 'center' }}>
                  {item.quantity} x {item.precio}€ = {item.quantity * item.precio}€
                </span>
                <span style={{ flex: '1', textAlign: 'center' }}>
                  <Button
                    color="primary"
                    size="sm"
                    onClick={() => this.modifyCart(item.id, 1)}
                  >
                    +
                  </Button>{' '}
                  <Button
                    color="secondary"
                    size="sm"
                    onClick={() => this.modifyCart(item.id, -1)}
                  >
                    -
                  </Button>
                </span>
              </div>
            ))
          )}
          <hr />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <h4>Total: {totalPrice}€</h4>
          </div>
          <hr />
          <h5>Fill in your details to complete the purchase:</h5>
          <div>
            <label>Name:</label>
            <br />
            {this.state.loggedUser ? (
              <input
                type="text"
                defaultValue={this.state.loggedUser.usuario}
                readOnly
              />
            ) : (
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                placeholder="Enter your name"
              />
            )}
            <br /><br />
          </div>
          <div>
            <label>Address:</label>
            <br />
            <input
              type="text"
              name="address"
              value={this.state.address}
              onChange={this.handleChange}
              placeholder="Enter your address"
            />
            <br /><br />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <h4 style={{ textAlign: 'right' }}>
              Your order total is: {totalPrice}€
            </h4>
          </div>
          {this.state.showAlert && (
            <Alert
              color={this.state.alertColor}
              toggle={() =>
                this.setState({ showAlert: false, alertMessage: "" })
              }
            >
              {this.state.alertMessage}
            </Alert>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={this.handlePurchase}>
            Purchase
          </Button>
          <Button color="secondary" onClick={this.toggleCart}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  // Ventana pedidos realizados
  pedidosModal = () => {
    return (
      <Modal
        isOpen={this.state.showPedidosModal}
        toggle={this.togglePedidosModal}
        size="xl"
        modalClassName="modal-custom-size"
      >
        <ModalHeader toggle={this.togglePedidosModal}>Orders</ModalHeader>
        <ModalBody>
          {this.state.pedidos.length === 0 ? (
            <p>No orders have been placed.</p>
          ) : (
            this.state.pedidos.map((order, index) => {
              const orderTotal = order.pedidos.reduce(
                (accum, item) => accum + item.quantity * item.precio,
                0
              );
              return (
                <Table borderless key={index}>
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>{index + 1}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Name:</strong></td>
                      <td>{order.nombre}</td>
                    </tr>
                    <tr>
                      <td><strong>Address:</strong></td>
                      <td>{order.direccion}</td>
                    </tr>
                    <tr>
                      <td><strong>Products:</strong></td>
                      <td>
                        <Table striped>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Product</th>
                              <th>Units</th>
                              <th>Unit Price</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.pedidos.map((item, idx) => (
                              <tr key={item.id}>
                                <td>{idx + 1}</td>
                                <td>{item.nombre}</td>
                                <td>{item.quantity}</td>
                                <td>{item.precio}</td>
                                <td style={{ textAlign: "right" }}>
                                  {item.quantity * item.precio} €
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Order Total:</strong></td>
                      <td style={{ textAlign: "right" }}>{orderTotal} €</td>
                    </tr>
                  </tbody>
                </Table>
              );
            })
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.togglePedidosModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  };


  render() {
    const totalItems = this.state.cart.reduce((acc, item) => acc + item.quantity, 0);
    console.log("Logged User:", this.state.loggedUser);

    return (
      <>
        <div className="App">
          <HeaderComponent
            productos={this.state.productos}
            toggleCart={this.toggleCart}
            cartItemCount={totalItems}
            loggedUser={this.state.loggedUser}
            onLogout={this.handleLogout}
            onOpenLogin={this.toggleLoginModal}
            onOpenPedidos={this.togglePedidosModal}/>
          <Login
            show={this.state.isLoginOpen}
            toggle={this.toggleLoginModal}
            onLogin={this.handleLogin}/>
        </div>

        {/* Modal de carrito*/}
        {this.carritoModal()}

        {/* Modal de pedidos*/}
        {this.pedidosModal()}

        <h1>Products</h1>
        <hr />
        <ProductComponent productos={this.state.productos} addToCart={this.addToCart} />
        <FooterComponent />
      </>
    );
  }
}

export default App;
