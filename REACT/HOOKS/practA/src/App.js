import React, { Component, useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

const Atlas = ({ nuevoContacto }) => {
  // UTILICE HOOKS EN ESTE COMPONENTE
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleCambio = (e)=>{
    if(e.target.name === 'nombre'){
      setNombre(e.target.value);
    }
    if(e.target.name === 'apellidos'){
      setApellidos(e.target.value);
    }
    if(e.target.name === 'telefono'){
      setTelefono(e.target.value);
    }
  }

  const handleSubmit =(e)=>{
    e.preventDefault();
    nuevoContacto(nombre, apellidos, telefono);
  }
  return(
    <Form onSubmit={handleSubmit}>
    <FormGroup>
      <Label for="Nombre">Nombre:</Label>
      <Input
        name="nombre"
        id="nombre"
        placeholder="introduzca nombre"
        onChange={handleCambio}
      />
      <Label for="Nombre">Apellidos:</Label>
      <Input
        name="apellidos"
        id="apellidos"
        placeholder="introduzca apellidos"
        onChange={handleCambio}
      />
      <Label for="Nombre">Telefono:</Label>
      <Input
        name="telefono"
        id="telefono"
        placeholder="introduzca telefono"
        onChange={handleCambio}
      />
    </FormGroup>
    <Button>Añadir</Button>
  </Form>
  );
}
const Mostrar = ({ contactos, borrarContacto }) => {
  // ESTE COMPONENTE MUESTRA EL LISTÍN TELEFÓNICO
  return (
    <ul>
      {contactos.map(e => {
        return (
          <li>{e.nombre + " " + e.apellidos + " - " + e.telefono} <Button color='outline-info' onClick={() => borrarContacto(e.telefono)}>x</Button></li>
        )
      })}
    </ul>
  )
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // INSERTE AQUÑI EL ESTADO NECESARIO. AQUÍ SE GUARDARÁ TODA LA INFORMACIÓN DE LA APLICACIÓN. EL LISTÍN TELEFÓNICO.
      contactos: [
        { nombre: 'Koko', apellidos: 'Kokoro', telefono: '123456789' },
        { nombre: 'Dio', apellidos: 'Diomedes', telefono: '123456798' }
      ],
    }
  }

  nuevoContacto = (nombre,apellido,telefono)=>{
    let copia = this.state;
    let aux = [];
    if(copia.contactos.find(e=>e.telefono === telefono)=== undefined){
      aux.nombre=nombre;
      aux.apellidos=apellido;
      aux.telefono=telefono;
      copia.contactos.push(aux);
    }
    this.setState({copia})
  }
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
      <>
      <Mostrar contactos={this.state.contactos}
        borrarContacto={(telefono) => this.borrarContacto(telefono)} />
      <Atlas nuevoContacto={(nombre,apellidos,telefono)=>this.nuevoContacto(nombre,apellidos,telefono)}/>
      </>
    );
  }
}

export default App;