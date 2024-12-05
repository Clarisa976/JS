import logo from './logo.svg';
//import './App.css';
import React from 'react';
//import ReactDom from 'react-dom';

class Saluda extends React.Component {
  constructor(){
    super();
    this.state={
      saludo: "Esta aplicación saluda en varios idiomas"
    }
    this.mensajeIngles=this.mensajeIngles.blind(this);
    this.mensajeEspañol=this.mensajeEspañol.blind(this);
    this.mensajeAleman=this.mensajeAleman.blind(this);
    this.mensajeSueco=this.mensajeSueco.blind(this);
  }
  mensajeIngles(){this.setState({saludo:"hello"})}
 // mensajeEspañol(){this.setState({saludo:"holis"})}
  mensajeAleman(){this.setState({saludo:"hallo"})}
  mensajeSueco(){this.setState({saludo:"hej"})}
  render(){
    return(
      <div>
        <h1>{this.state.saludo}</h1>
        <button onClick={this.mensajeIngles}>Inglés</button>
        <button onClick={this.mensajeAleman}>Alemán</button>
        <button onClick={this.mensajeSueco}>Sueco</button>
        <button onClick={()=>this.mensajeEspañol()}>Español</button>
      </div>
    )
  }
 
}
//ReactDOM.render(<Saluda/>,document.getElementById('root'));
export default App;
