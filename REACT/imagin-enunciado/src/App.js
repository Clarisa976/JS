import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import { Button } from 'reactstrap';

// matriz 9x9 de botones
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaBotoncicos: Array.from({ length: 9 }, () => Array(9).fill('info')),
      listaColores: ['primary', 'warning', 'danger', 'success', 'secondary'], // Lista de colores
      contador: 0, // Contador para ciclar colores
    };
  }

  // Función que obtiene el siguiente color en la lista basado en el contador
  getNextColor() {
    const { listaColores, contador } = this.state;
    return listaColores[contador % listaColores.length]; // Cicla a través de los colores
  }

  // Verifica si algún vecino está pulsado, y devuelve el color de ese vecino
  checkVecinos(filaI, colI) {
    const vecinos = [
      [filaI - 1, colI], // arriba
      [filaI + 1, colI], // abajo
      [filaI, colI - 1], // izquierda
      [filaI, colI + 1]  // derecha
    ];

    for (const [nx, ny] of vecinos) {
      if (nx >= 0 && nx < 9 && ny >= 0 && ny < 9) {
        const vecino = this.state.listaBotoncicos[nx][ny];
        if (vecino !== 'info') { // Si el vecino tiene color distinto de 'info'
          return vecino; // Retorna el color del vecino
        }
      }
    }
    return null; // Si no hay vecinos pulsados
  }

  // Función que se encarga de cambiar el color de un botón y de sus vecinos
  handleClick(filaI, colI) {
    let aux = this.state.listaBotoncicos.map((fila, filaIndex) => {
      return fila.map((color, colorI) => {
        // Si la posición coincide, cambiar el color al siguiente basado en el contador
        if (filaIndex === filaI && colorI === colI) {
          const colorVecino = this.checkVecinos(filaI, colI);
          
          // Si hay un vecino pulsado, tomamos su color, sino tomamos el siguiente color
          if (colorVecino) {
            return colorVecino; // Asignar el color del vecino pulsado
          } else {
            return this.getNextColor(); // Obtener el siguiente color
          }
        }
        return color; // Mantener el color actual
      });
    });

    // Actualizamos el estado y el contador
    this.setState((prevState) => ({
      listaBotoncicos: aux,
      contador: prevState.contador + 1, // Incrementamos el contador
    }));
  }

  render() {
    return (
      <div className="App">
        {this.state.listaBotoncicos.map((fila, i) => (
          <div key={i}>
            {fila.map((boton, j) => (
              <Botoncillo
                key={j}
                color={boton} // El color ahora es directamente el valor de la celda
                onClick={() => this.handleClick(i, j)} // Pasamos las coordenadas del botón clicado
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

function Botoncillo(props) {
  return (
    <Button color={props.color} onClick={props.onClick} />
  );
}

export default App;
