import './App.css';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';

function Botonera(props){
  return (props.listaBotones.map(boton=>{
    if(boton==='outline'){
      return <Button outline/>
    }else if(boton==="br"){
      return <br/>
    }else{
      return <Button color={boton}/>
    }
  }))
}
class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      listaBotones:[],
      playable:false
    }
  }
  jugar(){
    let botones=[];
    //los primeros 5
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 8; j++) {
        if((i+j)%2===0){
          botones.push('outline');
        }else{
          botones.push('secondary');
        }
        if(j===7){
          botones.push("br");
        }
      }      
    }
    //los que van en verde
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 8; j++) {
        if((i+j)%2===0){
          botones.push('outline');
        }else{
          botones.push('success');
        }
        if(j===7){
          botones.push("br");
        }
      }      
    }
    this.setState({listaBotones:botones,playable:true});
  }
  render(){
  return (
    <div className="App">
      <Button onClick={()=>this.jugar()}>Jugar</Button>
      <br />
      {this.state.playable&&<Botonera listaBotones={this.state.listaBotones}/>}
    </div>
  );
}
}
export default App;