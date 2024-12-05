import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from 'reactstrap';
import { Component } from 'react';

class App extends Component{
  constructor(props){
    super(props)
    this.state={
      colores:Array(5).fill('secondary'),
      ultimos: [] //guardar los dos últimos botones pulsados
    };
  }

  cambiarColor(numBotoncito) {
    let copiaColores = [...this.state.colores];
    let nuevosBotoncitos = [...this.state.ultimos];

    //cambiamos el color pulsado
    copiaColores[numBotoncito] = 'info';

    //si no está el botón lo agregamos a la lista
    if (!nuevosBotoncitos.includes(numBotoncito)) {
      nuevosBotoncitos.push(numBotoncito);
    }

    //si hay mas de dos colores se cambia
    if (nuevosBotoncitos.length > 2) {
      let botonCambiar = nuevosBotoncitos.shift(); //eliminamos el más viejo de los que hay en el array
      copiaColores[botonCambiar] = 'secondary'; //vuelve al color base
    }

    this.setState({
      colores: copiaColores,
      ultimos: nuevosBotoncitos
    });
  }
  

  render(){
    return (
      <>
        <Button color={this.state.colores[0]} onClick={()=>this.cambiarColor(0)}> Uno</Button>
        <Button color={this.state.colores[1]}onClick={()=>this.cambiarColor(1)}> Dos</Button>
        <Button color={this.state.colores[2]}onClick={()=>this.cambiarColor(2)}> Tres</Button>
        <Button color={this.state.colores[3]}onClick={()=>this.cambiarColor(3)}> Cuatro</Button>
        <Button color={this.state.colores[4]}onClick={()=>this.cambiarColor(4)}> Cinco</Button>
        
      </>
    );
  }
}

export default App;
