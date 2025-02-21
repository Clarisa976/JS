import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import { Button } from 'reactstrap';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      //aquí se define el estado
      euros:0,
      factor:1.2,
    }
  }
  aumentar(){
    let copiaEuro=this.state.euros+1;
    this.setState({euros:copiaEuro})
  }
  disminuir(){
    let copiaEuro=this.state.euros-1;
    if(this.state.euros>=0){//controlamos que no haya negativos
      this.setState({euros:copiaEuro})
    }
  }
  render(){  
  return (
    <div className="App">
      <div>
        <p>{this.state.euros}€ equivalen a {(this.state.euros*this.state.factor)}$</p>
        <p><Button onClick={()=>this.aumentar()}>+</Button> <Button onClick={()=>this.disminuir()}>-</Button></p>
      </div>
      <Button>
        Dale
      </Button>
    </div>
  );
}
}
export default App;