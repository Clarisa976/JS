import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from 'reactstrap';
import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      botoncitos: Array(5).fill('secondary'),
      contadores: Array(5).fill(0)
    };
  }

  setSeleccionado(num) {
    let aux = this.state.botoncitos;
    aux[num] = 'info';
    let auxContador = this.state.contadores;
    auxContador[num] += 1;
    this.setState({ botoncitos: aux,
      contadores: auxContador });

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>{this.state.cuantos}</h1>

          <div>
            <Botoncillo numBoton={0} color={this.state.botoncitos[0]} pulsar={(n) => this.setSeleccionado(n)} contador={this.state.contadores[0]} />
            <Botoncillo numBoton={1} color={this.state.botoncitos[1]} pulsar={(n) => this.setSeleccionado(n)} contador={this.state.contadores[1]}/>
            <Botoncillo numBoton={2} color={this.state.botoncitos[2]} pulsar={(n) => this.setSeleccionado(n)} contador={this.state.contadores[2]}/>
            <Botoncillo numBoton={3} color={this.state.botoncitos[3]} pulsar={(n) => this.setSeleccionado(n)}contador={this.state.contadores[3]} />
            <Botoncillo numBoton={4} color={this.state.botoncitos[4]} pulsar={(n) => this.setSeleccionado(n)} contador={this.state.contadores[4]}/>
          </div>
        </header>
      </div>
    );
  }
}
function Botoncillo(props) {
  return (
    // MUESTRA AQUÍ EL BOTÓN CON EL COLOR CORRESPONDIENTE
    <>
      <Button color={props.color} onClick={() => props.pulsar(props.numBoton)}>{props.contador}</Button>
    </>
  );
}
export default App;