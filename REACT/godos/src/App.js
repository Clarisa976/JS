import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from 'reactstrap';
import { Component } from 'react';

function App (props){
  
    return (
      <>
        <Button color={this.state.color}> Dale</Button>
        <Button color='info' onClick={()=>this.azul()} >Azul</Button>
        <Button color='danger' onClick={()=>this.rojo()}>Rojo</Button>
      </>
    );
  
}

export default App;
