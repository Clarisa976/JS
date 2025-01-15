import React, { Component } from 'react'
import { Button } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const MapaBotones = (props) => {
  if (props.iniciarJuego) {
    // este componente pinta el tablero 9x9 con las props que le paso.
    let matriz = [];
    //doble bucle for para la matriz 9x9
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (i == 0) {
          matriz.push(<Button color={props.listaBotones[i][j]} outline onClick={() => props.clica(i, j)} />);
        } else {
          if (props.listaBotones[i][j] != "secondary") {
            matriz.push(<Button color={props.listaBotones[i][j]} />);
          } else {
            matriz.push(<Button color={props.listaBotones[i][j]} outline />);
          }
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
      listaBotones: Array(9).fill(null),
      iniciarJuego: false
      // no se puede modificar el state
    }
  }

  clica = (x, y) => {
    // x se supone que la columna, y la fila
    let aux = this.state;
    let contador = 8;
    let visitado = false;
    while (contador >= 0 && !visitado) {
      if (aux.listaBotones[contador][y] === 'secondary') {
        aux.listaBotones[contador][y] = 'info';
        visitado = true;
      }
      contador--;
    }
    this.setState({ aux });
  }

  componentWillMount() {
    // aquí es donde creo las nueve columnas con los datos iniciales.
    let aux = this.state.listaBotones;
    for (let i = 0; i < 9; i++) {
      aux[i] = Array(9).fill('secondary');
    }
    this.setState({ listaBotones: aux });
  }
  /* iniciarJuego = () => {
  if (!this.state.listaBotones[0]) { // Verificamos si listaBotones no está inicializado
    const copiaListaBotones = Array(9).fill(null).map(() => Array(9).fill("secondary"));
    this.setState({ listaBotones: copiaListaBotones, iniciarJuego: true });
  } else {
    this.setState({ iniciarJuego: true });
  }
};*/
  iniciarJuego = () => {
    if (!this.state.listaBotones[0]) { // Verificamos si listaBotones no está inicializado
      const copiaListaBotones = Array(9).fill(null).map(() => Array(9).fill("secondary"));
      this.setState({ listaBotones: copiaListaBotones, iniciarJuego: true });
    } else {
      this.setState({ iniciarJuego: true });
    }
  };

  render() {
    return (
      <div className="App">
        <h1> </h1>
        <div>
          <Button onClick={this.iniciarJuego}>Jugar</Button>
        </div>
        <div>

          <MapaBotones listaBotones={this.state.listaBotones} iniciarJuego={this.state.iniciarJuego} clica={(x, y) => this.clica(x, y)} />

        </div>
      </div>
    );
  }
}

export default App;