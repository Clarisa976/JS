import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-social/bootstrap-social.css';
import { Component } from 'react';
import { Button } from 'reactstrap';

class App extends Component {
  constructor(props){
    super(props);
    this.state={minas:0}
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
  render(){
    return (
    <div className="App">
      <div>
      <h2>Minas: {this.state.minas}<Button onClick={()=>this.aumentar()}>+</Button><Button onClick={()=>this.disminuir()}>-</Button></h2>
      </div>
      <Button>Jugar</Button>
    </div>
  );
  }
}

export default App;