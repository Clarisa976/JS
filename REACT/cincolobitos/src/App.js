import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from 'reactstrap';
import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      botoncitos: Array(5).fill('secondary'),
      contadores: Array(5).fill(0),
      decrementando: false,
    };
  }

  setSeleccionado(num) {

    const nuevosContadores = [...this.state.contadores];
    nuevosContadores[num] += 1;

    const nuevosBotoncitos = [...this.state.botoncitos];
    nuevosBotoncitos[num] = 'info';

    this.setState({ contadores: nuevosContadores, botoncitos: nuevosBotoncitos });

    if (!this.state.decrementando) {
      this.iniciarReduccion();
    }
  }

  iniciarReduccion() {
    this.setState({ decrementando: true });

    const reducir = () => {
      const contadores = [...this.state.contadores];

      const maxIndex = contadores.indexOf(Math.max(...contadores));

      if (contadores[maxIndex] > 0) {
        contadores[maxIndex] -= 1; 
        const nuevosBotoncitos = Array(5).fill('secondary');
        contadores.forEach((contador, index) => {
          if (contador > 0) {
            nuevosBotoncitos[index] = 'info';
          }
        });

        this.setState({ contadores, botoncitos: nuevosBotoncitos }, () => {

          if (Math.max(...contadores) > 0) {
            setTimeout(reducir, 1000);
          } else {
            this.setState({ decrementando: false });
          }
        });
      } else {
        this.setState({ decrementando: false }); 
      }
    };

    setTimeout(reducir, 3000);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1></h1>
          <div>
            <Botoncillo
              numBoton={0}
              color={this.state.botoncitos[0]}
              pulsar={(n) => this.setSeleccionado(n)}
              contador={this.state.contadores[0]}
            />
            <Botoncillo
              numBoton={1}
              color={this.state.botoncitos[1]}
              pulsar={(n) => this.setSeleccionado(n)}
              contador={this.state.contadores[1]}
            />
            <Botoncillo
              numBoton={2}
              color={this.state.botoncitos[2]}
              pulsar={(n) => this.setSeleccionado(n)}
              contador={this.state.contadores[2]}
            />
            <Botoncillo
              numBoton={3}
              color={this.state.botoncitos[3]}
              pulsar={(n) => this.setSeleccionado(n)}
              contador={this.state.contadores[3]}
            />
            <Botoncillo
              numBoton={4}
              color={this.state.botoncitos[4]}
              pulsar={(n) => this.setSeleccionado(n)}
              contador={this.state.contadores[4]}
            />
          </div>
        </header>
      </div>
    );
  }
}

function Botoncillo(props) {
  return (
    <>
      <Button color={props.color} onClick={() => props.pulsar(props.numBoton)}>
        {props.contador}
      </Button>
    </>
  );
}

export default App;
