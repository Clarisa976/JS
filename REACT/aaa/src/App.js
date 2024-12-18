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
*/