import React, { Component, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

const Alta = (props) => {
  // UTILICE HOOKS EN ESTE COMPONENTE
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [telefono, setTelefono] = useState('');
  const { className, nuevoContacto } = props;

  const handleCambio = (e) => {
    if (e.target.name === 'nombre') {
      setNombre(e.target.value);
    }
    if (e.target.name === 'apellidos') {
      setApellidos(e.target.value);
    }
    if (e.target.name === 'telefono') {
      setTelefono(e.target.value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    nuevoContacto(nombre, apellidos, telefono);
    setNombre('');
    setApellidos('');
    setTelefono('');
    props.toggle();
    
  }
  return (
    <div>
      <Modal isOpen={props.mostrar} toggle={props.toggle} className={className} onEntering={"//ESTO SE EJECUTA CUANDO MUESTRAS LA VENTANA"}>
        <ModalHeader toggle={props.toggle}>{props.titulo}</ModalHeader>
        <ModalBody>

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
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>{props.botonAceptar}</Button>
        </ModalFooter>
      </Modal>
    </div>
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
      // INSERTE AQUÍ EL ESTADO NECESARIO. AQUÍ SE GUARDARÁ TODA LA INFORMACIÓN DE LA APLICACIÓN. EL LISTÍN TELEFÓNICO.
      contactos: [
        { nombre: 'Kokoro', apellidos: 'Ruiz', telefono: '123456789' },
        { nombre: 'Diomedes', apellidos: 'Álvarez', telefono: '987654321' }
      ],
      isOpend: false,
    }
  }
  setIsOpen(d) {
    if (d === undefined) return;
    this.setState({ isOpen: d })
  }
  toggleModal = () => {
    this.setIsOpen(!this.state.isOpen)
  }

  nuevoContacto = (nombre, apellido, telefono) => {
    let copia = this.state;
    let aux = [];
    if (copia.contactos.find(e => e.telefono === telefono) === undefined) {
      if (nombre.trim() !== "" && apellido.trim() !== "" && telefono.trim() !== "") {
        aux.nombre = nombre;
        aux.apellidos = apellido;
        aux.telefono = telefono;
        copia.contactos.push(aux);
      } else {
        alert("Campo vacío");
      }
      
    } else {
      alert("El número de teléfono ya se encuentra en la BD");
    }
    this.setState({ copia })
  }
  borrarContacto = (telefono) => {
    let copia = this.state;
    let aux = []

    copia.contactos.filter(e => {
      if (telefono !== e.telefono) {
        aux.push(e)
      }
    })

    copia.contactos = aux;

    this.setState({ copia })
  }

  render() {
    return (
      <>
        <Mostrar contactos={this.state.contactos}
          borrarContacto={(telefono) => this.borrarContacto(telefono)} />
        <Button color="outline-primary" className="mt-3" onClick={() => { this.toggleModal() }}>
          Alta contacto
        </Button>


        <Alta
          nuevoContacto={(nombre, apellidos, telefono) => this.nuevoContacto(nombre, apellidos, telefono)}
          mostrar={this.state.isOpen}
          botonAceptar={"Alta"}
          titulo={"DAR DE ALTA"}
          toggle={() => this.toggleModal()} />
      </>
    );
  }
}

export default App;