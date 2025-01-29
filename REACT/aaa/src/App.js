import React, { Component, useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const Altas = (props) => {
  const { nuevoContacto } = props;
  // UTILICE HOOKS EN ESTE COMPONENTE
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [telefono, setTelefono] = useState('');

  //manejo de cambiar el estado
  const handleChange = (e) => {
    if (e.target.name === "nombre") {
      setNombre(e.target.value);
    }
    if (e.target.name === "apellidos") {
      setApellidos(e.target.value);
    }
    if (e.target.name === "telefono") {
      setTelefono(e.target.value);
    }
  }

  //manejo del envio del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim() && apellidos.trim() && telefono.trim()) {
      nuevoContacto(nombre, apellidos, telefono);
    } else {
      alert("no dejes campos vacíos");
    }
  }
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="Nombre">Nombre:</Label>
        <Input name="nombre" id="nombre" placeholder="introduzca nombre" onChange={handleChange} />
        <Label for="Nombre">Apellidos:</Label>
        <Input name="apellidos" id="apellidos" placeholder="introduzca apellidos" onChange={handleChange} />
        <Label for="Nombre">Telefono:</Label>
        <Input name="telefono" id="telefono" type='number' placeholder="introduzca telefono" onChange={handleChange} />
      </FormGroup>
      <Button>Añadir</Button>
    </Form>
  );
}

const Mostrar = (props) => {
  // ESTE COMPONENTE MUESTRA EL LISTÍN TELEFÓNICO.
  const { contactos, borrarContacto } = props;
  return (
    <ul>
      {contactos.map(e => { return (<li>{e.nombre + ' ' + e.apellidos + ' ' + e.telefono + ' '}<Button onClick={() => borrarContacto(e.telefono)}>x</Button></li>) })}
    </ul>
  );

}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // INSERTE AQUÍ EL ESTADO NECESARIO. AQUÍ SE GUARDARÁ TODA LA INFORMACIÓN DE LA APLICACIÓN. EL LISTÍN TELEFÓNICO
      contactos: [
        { nombre: 'asdf', apellidos: 'zxcv', telefono: '123' }
      ],
    };
  }
  //nuevoContacto
  nuevoContacto(nombre, apellidos, telefono) {
    let copia = this.state;
    let aux = [];
    if (copia.contactos.find(e => e.telefono === telefono) === undefined) {
      aux.nombre = nombre;
      aux.apellidos = apellidos;
      aux.telefono = telefono;
      copia.contactos.push(aux);
    }
    this.setState({ copia });
  }
  //borrarContacto
  borrarContacto = (telefono) => {
    let copia = this.state;
    let aux = []

    copia.contactos.filter(e => {
      if(telefono !== e.telefono){
        aux.push(e)
      }
    })

    copia.contactos = aux;
    
    this.setState({copia})
  }
  render() {
    return (
      <div className="App">
        {/* DEBERÁ RENDERIZAR AL MENOS LOS DOS COMPONENTES ANTERIORES*/}
        <Mostrar contactos={this.state.contactos} borrarContacto={(telefono) => this.borrarContacto(telefono)} />
        <Altas nuevoContacto={(nombre, apellidos, telefono) => this.nuevoContacto(nombre, apellidos, telefono)} />
      </div>
    );
  }
}
export default App;