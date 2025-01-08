import './App.css';
//import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap-social/bootstrap-social.css';
import { Component } from 'react';
import { Button } from 'reactstrap';

class App extends Component {
  constructor(props){
    super(props);
    this.state={minas:0,
      matriz:[]
    }
  }
  aumentar(){
    let aux = this.state.minas+1;
    this.setState({minas:aux})
  }
  disminuir(){
    let aux = this.state.minas-1;
    if(aux>=0){
    this.setState({minas:aux})
    }
  }
  iniciarJuego(){
    let aux = [];
    for(let i=0;i<9;i++){
      let fila = [];
      for(let j=0;j<9;j++){
        fila.push(' ');
      }
      aux.push(fila);
    }
    this.setState({matriz:aux});
  }
  render(){
    return (
    <div className="App">
      <div>
      <h2>Minas: {this.state.minas}<Button onClick={()=>this.aumentar()}>+</Button><Button onClick={()=>this.disminuir()}>-</Button></h2>
      </div>
      <div>
        <Button onClick={() => this.iniciarJuego()}>Jugar</Button>
      </div>
      <div>
        {this.state.matriz.map((fila, filaIndex) => {
          return fila.map((valor, colIndex) => {
            return <Button key={filaIndex*9+colIndex}>{valor}</Button>
          });
        })}
    </div>
    </div>
  );
  }
}

export default App;