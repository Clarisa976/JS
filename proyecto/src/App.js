import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";
import { Button } from 'reactstrap';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import Login from "./components/LoginComponent";
import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggleModal = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    return (
      <>
        <div className="App">
          <HeaderComponent />
          <Button color="primary" onClick={this.toggleModal}>Login</Button>

          <Login
            mostrar={this.state.isOpen}
            toggle={this.toggleModal}
          />
      
        </div>
        <FooterComponent />
      </>
    );
  }
}



export default App;