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
//import { PIELES } from '../src/data/Pieles';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      //productos: PIELES.productos,
      productos: [],
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


  render() {
    return (
      <>
        <div className="App">
          <HeaderComponent productos={this.state.productos} />

          <Login mostrar={this.state.isOpen} toggle={this.toggleModal} />
        </div>
        <ProductComponent productos={this.state.productos} />
        <FooterComponent />
      </>
    );
  }
}



export default App;