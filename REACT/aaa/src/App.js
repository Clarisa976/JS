import React, { Component, useState } from "react";
import { Button, Input, FormGroup, Label, Col, Table, ButtonGroup,Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";


const Saldo = (props) => {
  const { titulo, cambiaSaldo } = props;
  const [telefono, setTelefono] = useState("");
  const [saldo, setSaldo] = useState(0);

  const handleChange = (event) => {
    if (event.target.name === "telefono") {
      setTelefono(event.target.value)
    }
    if (event.target.name === "saldo") {
      setSaldo(event.target.value);
    }
  }

  const handleClick = () => {
    if (titulo === "Añadir saldo") {
      cambiaSaldo({ telefono: telefono, saldo: Number(saldo), tipo: "sumo" })
    }
    if (titulo === "Gastar saldo") {
      cambiaSaldo({ telefono: telefono, saldo: Number(saldo), tipo: "gasto" })
    }

  }

  return (
    <div>
      <h3>{titulo}</h3>
      <FormGroup row>
        <Label sm={10} > Teléfono: </Label>
        <Col sm={8}>
          <Input
            id="telefono"
            name="telefono"
            type="Text" onChange={handleChange} />
        </Col>
        <Label sm={10} > Saldo: </Label>
        <Col sm={8}>
          <Input
            id="saldo"
            name="saldo"
            type="Number" onChange={handleChange} />
        </Col>
      </FormGroup>
      <Button color="primary" onClick={handleClick}>ACTUALIZAR</Button>
    </div>


  );
}


const Altas = (props) => {
  const { alta } = props;
  // ALTAS DE USUARIOS
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [saldo, setSaldo] = useState(0);


  const handleChange = (event) => {
    if (event.target.name === "nombre") {
      setNombre(event.target.value);
    }
    if (event.target.name === "telefono") {
      setTelefono(event.target.value);
    }
    if (event.target.name === "saldo") {
      setSaldo(event.target.value);
    }
  }

  const handleClick = () => {
    alta({ nombre: nombre, telefono: telefono, saldo: Number(saldo) })
  }


  return (
    <div>
      <h3>Alta de usuario</h3>
      <FormGroup row>
        <Label sm={10} > Nombre: </Label>
        <Col sm={8}>
          <Input
            id="nombre"
            name="nombre"
            type="Text" onChange={handleChange} />
        </Col>
        <Label sm={10} > Teléfono: </Label>
        <Col sm={8}>
          <Input
            id="telefono"
            name="telefono"
            type="Text" onChange={handleChange} />
        </Col>
        <Label sm={10} > Saldo: </Label>
        <Col sm={8}>
          <Input
            id="saldo"
            name="saldo"
            type="Number" onChange={handleChange} />
        </Col>
      </FormGroup>


      <Button color="primary" onClick={handleClick}>ALTA</Button>
    </div>


  );
}


const Mostrar = (props) => {
 const { datos, borrar, toggleModal, opcion, alta, cambiaSaldo } = props;
  // ESTE COMPONENTE MUESTRA LA TABLA
// Según la opción elegida se define el contenido y título de la modal
let contenidoModal = null;
let tituloModal = "";
if (opcion === 1) {
  tituloModal = "Alta de usuario";
  contenidoModal = <Altas alta={alta} />;
} else if (opcion === 2) {
  tituloModal = "Añadir saldo";
  contenidoModal = <Saldo titulo="Añadir saldo" cambiaSaldo={cambiaSaldo} />;
} else if (opcion === 3) {
  tituloModal = "Gastar saldo";
  contenidoModal = <Saldo titulo="Gastar saldo" cambiaSaldo={cambiaSaldo} />;
}

  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th></th>
            <th>Teléfono</th>
            <th>Nombre</th>
            <th>Saldo</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((e) => (
            <tr key={e.telefono}>
              <td>
                <Button onClick={() => borrar(e.telefono)}>Borrar</Button>
              </td>
              <td>{e.telefono}</td>
              <td>{e.nombre}</td>
              <td>{e.saldo}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* La Modal se define aquí, dentro del return de Mostrar */}
      <Modal isOpen={props.mostrar} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{tituloModal}</ModalHeader>
        <ModalBody>{contenidoModal}</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // INSERTE AQUÍ EL ESTADO NECESARIO. AQUÍ SE GUARDARÁ TODA LA INFORMACIÓN
      listaUsuarios: [
        { nombre: "Usuario 1", telefono: "607666356", saldo: 10 },
        { nombre: "Usuario 2", telefono: "123456789", saldo: 100 },
        { nombre: "Usuario 3", telefono: "987654321", saldo: 1000 }
      ],
      opcion: 0, // 1: Alta, 2: Sumar saldo, 3: Gastar saldo
      modalOpen: false,
    };
  }

  borrar = (telefono) => {
    let copiaState = this.state;

    let aux = [];

    copiaState.listaUsuarios.map(e => {
      if (e.telefono !== telefono) {
        aux.push(e);
      }
    })

    copiaState.listaUsuarios = aux;

    this.setState({ copiaState })
  }

  alta = (usuario) => {
    let copiaState = this.state;

    if (!copiaState.listaUsuarios.find(e => e.telefono === usuario.telefono) && usuario.nombre !== "") {
      copiaState.listaUsuarios.push(usuario);
    }

    this.setState({ copiaState });
    this.toggleModal();
  }

  cambiaOpcion = (opc) => {
    this.setState({ opcion: opc, modalOpen: true });
  }
  setIsOpen(d) {
    if (d === undefined) return;
    this.setState({ isOpen: d })
  }
  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  }
  cambiaSaldo = (usuario) => {
    let copiaState = this.state;

    if (usuario.tipo === "sumo") {
      copiaState.listaUsuarios.map(e => {
        if (e.telefono === usuario.telefono) {
          e.saldo += usuario.saldo
        }
      })
    } else {
      copiaState.listaUsuarios.map(e => {
        if (e.telefono === usuario.telefono) {
          e.saldo -= usuario.saldo
          if (e.saldo <= 0) {
            e.saldo = 0;
          }
        }
      })
    }



    this.setState({ copiaState });
    this.toggleModal();
  }

  render() {
    

    return (
      <div className="App">
        <h1>GESTION USUARIOS</h1>

        <Mostrar
          datos={this.state.listaUsuarios}
          borrar={this.borrar}
          mostrar={this.state.modalOpen}
          toggleModal={this.toggleModal}
          opcion={this.state.opcion}
          alta={this.alta}
          cambiaSaldo={this.cambiaSaldo}
        />

        <ButtonGroup className="mt-3">
          <Button className="m-1" color="info" onClick={() => this.cambiaOpcion(1)}>
            Alta usuario
          </Button>
          <Button className="m-1" color="success" onClick={() => this.cambiaOpcion(2)}>
            Sumar saldo
          </Button>
          <Button className="m-1" color="danger" onClick={() => this.cambiaOpcion(3)}>
            Gastar saldo
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}
export default App;