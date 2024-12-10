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

  quitar(elemento) {
    let aux = this.state.deseos.slice();
    aux = aux.filter(item => item !== elemento)
    this.setState({ deseos: aux });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1> Lista de deseos </h1>
          Añade tu regalo favorito
          <DesireList deseos={this.state.deseos} quitar={(elemento)=>this.quitar(elemento)}/>
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
              <li>
                {d} {" "} &nbsp;
                <Borrar deseo={d} quitar={(elemento)=>this.props.quitar(elemento)}/>
              </li>
            )
          })
        }
      </ul>
    )
  }
}
/*
function PrintDeseo(props) {
  return (
    <li>{props.deseo}</li>
  )
}
  */
function Borrar(props){
  return(
    <button className='borrar' onClick={(deseo)=>props.quitar(props.deseo)}> Borrar{props.deseo} </button>
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
