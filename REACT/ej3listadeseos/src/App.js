import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deseos: ["GAMBAS", "JAMÓN"],
    }
  }

  handleAniadirDeseo(event) {
    event.preventDefault();
    let aux = this.state.deseos.slice();
    aux.push(event.target.deseo.value)
    this.setState({ deseos: aux })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1> Lista de deseos </h1>
          Añade tu regalo favorito
          <DesireList deseos={this.state.deseos} />
          <Desire onAddDeseo={(e) => this.handleAniadirDeseo(e)} />
        </header>
      </div>
    );
  }
}

class DesireList extends Component {
  render() {
    return (
      <ul>
        {
          this.props.deseos.map(d => {
            return (
              <PrintDeseo deseo={d} />
            )
          })
        }
      </ul>
    )
  }
}
function PrintDeseo(props) {
  return (
    <li>{props.deseo}</li>
  )
}

class Desire extends Component {
  render() {
    return (
      <form onSubmit={this.props.onAddDeseo}>
        <input type="text" placeholder="Escribe tu deseo" name="deseo" />
      </form>
    )
  }
}


export default App;
