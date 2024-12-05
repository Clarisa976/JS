import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap';
import { Component } from 'react';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alertVisible: false,
      alertMessage: '',
      alertClass: '',
    };
  }
  mostrarAlerta(color) {
    if (color === 'azul') {
      this.setState({
        alertVisible: true,
        alertMessage: 'La palabra «azul» se escribe sin tilde porque es aguda terminada en consonante distinta de «n» o «s»',
        alertClass: 'alert-info',
      })
    } else if (color === 'rojo') {
      this.setState({
        alertVisible: true,
        alertMessage: 'Se considera que el rojo es un color cálido, con una relación con el fuego y la incandescencia',
        alertClass: 'alert-danger',
      })
    }
  }
  render() {
    return (
      <div className="App">
        <Button color='info' onClick={() => this.mostrarAlerta('azul')}>Pulsa</Button>
        <Button color='danger' onClick={() => this.mostrarAlerta('rojo')}>Pulsa</Button>

        <div className={`alert ${this.state.alertClass} mt-4`}
          role="alert">
          {this.state.alertMessage}
        </div>

      </div>
    );
  }
}

export default App;
