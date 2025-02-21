import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button } from 'reactstrap';

function Boton(props) {
  return (
    <Button color={props.color} onClick={props.cambia}>
      {props.texto}
    </Button>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      letrero: "Esta aplicación saluda en varios idiomas",
    }
  }
  cambia({ saludo }) {
    this.setState({ letrero: saludo })
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.letrero}</h1>
        <Boton cambia={() => this.cambia({ saludo: "Hello!" })} texto="Inglés" color="danger" />
        <Boton cambia={() => this.cambia({ saludo: "Salut!" })} texto="Francés" color="info" />
        <Boton cambia={() => this.cambia({ saludo: "¡Hola!" })} texto="Español" color="success" />
      </div>
    );
  }
}

export default App;

/*
cambia() {
if (this.state.color === "danger") {
this.setState({ color: "success" })
} else {
this.setState({ color: "danger" })
}
}
*//*import logo from './logo.svg';
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
export default App;*/
