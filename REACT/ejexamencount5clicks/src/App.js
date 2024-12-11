import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from 'reactstrap';
import { Component } from 'react';

class App extends Component{
  constructor(props){
    super(props)
    this.state={
      color:'secondary'
    }
  //this.rojo=this.color.blind(this)
  //this.azul=this.color.blind(this)
}
  rojo(){this.setState({color:'danger'})}
  azul(){this.setState({color:'info'})}

  render(){
    return (
      <>
        <Button color={this.state.color}> Dale</Button>
        <Button color='info' onClick={()=>this.azul()} >Azul</Button>
        <Button color='danger' onClick={()=>this.rojo()}>Rojo</Button>
      </>
    );
  }
}

export default App;
