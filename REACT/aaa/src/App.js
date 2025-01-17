import React, { Component } from 'react'
import { Button } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function Botonera(props) {
  // componente que renderiza el tablero
  //si se puede jugar
  if (props.playable) {
    let matriz = [];
    //doble bucle para hacer el tablero8x8
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        //si es par
        if ((i+j) % 2 === 0) {
          matriz.push(<Button color={props.listaBotones[i][j]} />);
        } else {
          matriz.push(<Button outline />);          
        }
      }
      matriz.push(<br />);
    }
    return matriz;
  }

}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaBotones: [],
      playable: false
      // no se puede modificar el state
    }
  }



  jugar() {
    let copiaJugable = this.state.playable;
    let copiaLista = this.state.listaBotones;

    if (copiaJugable) {
      //si ya se ha jugado no se hace nada
      copiaJugable = false;
    } else {
      //sino se crea el tablero
      copiaJugable = true;
      //los cinco primeros
      for (let i = 0; i < 5; i++) {
        copiaLista[i] = Array(8).fill('secondary');
      }
      //los que van en verde
      for (let j = 5; j < 8; j++) {
        copiaLista[j] = Array(8).fill('success');
      }
    }
    this.setState({ listaBotones: copiaLista, playable: copiaJugable });
  }
  render() {
    return (
      <div className="App">
        <h1> </h1>

        <div>
          <Button onClick={() => this.jugar()}>Jugar</Button>
          {/*aquí se renderiza el componente botonera si se pulsa jugar*/}
        </div>
        <div>
          <Botonera listaBotones={this.state.listaBotones} playable={this.state.playable} />
        </div>
      </div>
    );
  }
}

export default App;