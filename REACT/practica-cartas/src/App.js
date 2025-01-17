import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import { Component } from 'react';

function Botonera(props) {
  let contador=0;
  let aux=[];
  for (let i = 0; i < 9; i++) {
   aux.push(<br key={contador++}/>);
   for (let j = 0; j < 9; j++) {
    aux.push(<Botonera listaBotones={this.state.listaBotones} clicar={(i,j)=>this.clicar(i,j)}>{props.listaBotones[i][j]}</Botonera>)
    
   }
    
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaBotones: [],
      playable: false,
    };
  }
  aleatorio(min, max) {//devuelve un valor aleatorio entre min y max
    var horquilla = max - min;
    return Math.round(Math.random() * horquilla + min);
  }
  crearTablero(){
    let aux = this.state.listaBotones;
    for (let i = 0; i < 9; i++) {
      let fila=[];
      for (let j = 0; j < 9; j++) {
        fila.push({fin:false,pulsado:false,numer:this.aleatorio(0,9)});        
      }
      aux.push(fila)
    }
    this.setState({listaBotones:aux,playable:true});
  }
  jugar() {
    this.crearTablero();
  }
  clicar(i, j) {

  }



  render() {
    let lista =[];
    lista.push(<></>);
    if(this.state.playable) lista.push(<Botonera listaBotones={this.state.listaBotones} clicar={(i,j)=>this.clicar(i,j)}/>);
    return (
      <div className="App">
        <div>
          <Button onClick={() => this.jugar()}>Jugar</Button>
        </div>
        <div>
          <Botonera listaBotones={this.state.listaBotones} playable={this.state.playable} clicar={() => this.clicar()} />
        </div>
      </div>
    );
  }
}
export default App;