import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";
import { Button } from 'reactstrap';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import ProductComponent from './components/ProductComponent';
import Login from "./components/LoginComponent";
import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';
import { PIELES } from '../data/pieles';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      productos: PIELES.productos,
      //productos: [],
    };
  }

  componentDidMount() {
    fetch('/2daw/pieles.json')
      .then(response => response.json())
      .then(data => {
        this.setState({ productos: data.productos });
      })
      .catch(error => console.error('Error fetching data:', error));
  }

  toggleModal = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <>
        <div className="App">
          <HeaderComponent productos={this.state.productos} />
          <ProductComponent productos={this.state.productos} />
          <Login mostrar={this.state.isOpen} toggle={this.toggleModal} />
        </div>
        <FooterComponent />
      </>
    );
  }
}



export default App;