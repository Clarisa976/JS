import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from 'reactstrap';
import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      botoncitos: Array(5).fill('secondary'),
      cuantos : 0
    };
  }

  setSeleccionado(num){
    let aux = this.state.botoncitos;
    
    if (aux[num] !=='danger') {
      aux[num] ='danger';
      this.setState({ cuantos: num + 1 });
    }
    this.setState({botoncitos:aux});
    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>{this.state.cuantos}</h1>
          
          <div>
            <Botoncillo numBoton={0} color={this.state.botoncitos[0]} pulsar={(n)=>this.setSeleccionado(n)}/>
            <Botoncillo numBoton={1} color={this.state.botoncitos[1]} pulsar={(n)=>this.setSeleccionado(n)}/>
            <Botoncillo numBoton={2} color={this.state.botoncitos[2]} pulsar={(n)=>this.setSeleccionado(n)}/>
            <Botoncillo numBoton={3} color={this.state.botoncitos[3]} pulsar={(n)=>this.setSeleccionado(n)}/>
            <Botoncillo numBoton={4} color={this.state.botoncitos[4]} pulsar={(n)=>this.setSeleccionado(n)}/>
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
    
    <Button color={props.color} onClick={()=>props.pulsar(props.numBoton)}></Button>
    </>
  );
}
export default App;



/*EJERCICIO COMPLEJO:
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
    aux[num] = 'danger';
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

*/
/*
Juan Carlos Moreno Perez
9:40
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import { Component } from 'react';

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
        listabotones : Array(5).fill("secondary"),
        cuantos:0
     };
  }
 
  //esta es mi callback
  setSeleccionado(num){
    let l = this.state.listabotones;
    l[num]="danger"
    this.setState({listabotones:l})
  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>{this.state.cuantos}</h1>
          <br/>

          //pasarle la callback a botoncillo
          //cuidadin le tienes que decir a botoncillo quien es (el número)
          <Botoncillo color={this.state.listabotones[0]}/>
          <Botoncillo color={this.state.listabotones[1]}/>
          <Botoncillo color={this.state.listabotones[2]}/>
          <Botoncillo color={this.state.listabotones
[3]}/>
          <Botoncillo color={this.state.listabotones[4]}/>
        </header>
      </div>
    );
  }
 
 
 }
 
 function Botoncillo(props){
  return (
    <>
      //llamar a la callback en el onclick
      <Button color={props.color}></Button>
    </>
    
  );
 }
 

export default App;
*/
