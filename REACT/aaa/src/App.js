import React, { Component } from 'react'
import { Button } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const MapaBotones = (props) => {
  // este componente pinta el tablero 9x9 con las props que le paso.
  let matriz = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (i === 0) {
        matriz.push(<Button color={props.listaBotones[i][j]} outline onClick={()=>props.clica(i, j)} />);
      } else {
        if (props.listaBotones[i][j]!=="secondary") {
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



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listaBotones: Array(9).fill(null),
      // no se puede modificar el state
    }
  }

  clica = (x, y) => {
    // x se supone que la columna, y la fila
    let aux = this.state;
    let contador = 8;
    let visitado = false;
    while (contador>= 0 && !visitado) {
      if (aux.listaBotones[contador][y] === "secondary") {
        aux.listaBotones[contador][y] = "primary";
        visitado = true;
      }
      contador--;
    }
    this.setState({aux});
  }

  componentWillMount() {
    // aquí es donde creo las nueve columnas con los datos iniciales.
    let auxLista = this.state.listaBotones;
    for (let i = 0; i < 9; i++) {
      auxLista[i] = Array(9).fill("secondary");
    }
    this.setState({ listaBotones: auxLista });
  }

  render() {
    return (
      <div className="App">
        <h1> BUCHACA </h1>
        <MapaBotones listaBotones={this.state.listaBotones} clica={this.clica} />
      </div>
    );
  }
}

export default App;
