import React, { Component, useState } from "react";
import { Button, Input, FormGroup, Label, Col, Table, ButtonGroup } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";


const Saldo = ({ titulo, cambiaSaldo }) => {

  //GESTIÓN DE SALDO (SUMAR Y GASTAR)
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
    if(titulo === "Gastar saldo"){
      cambiaSaldo({ telefono: telefono, saldo: Number(saldo), tipo: "gasto" })
    }

  }

  return (
    <div>
      <h3>{titulo}</h3>
      <FormGroup row>
        <Label sm={1} > Teléfono: </Label>
        <Col sm={2}>
          <Input
            id="telefono"
            name="telefono"
            type="Text" onChange={handleChange} />
        </Col>
        <Label sm={1} > Saldo: </Label>
        <Col sm={2}>
          <Input
            id="saldo"
            name="saldo"
            type="Number" onChange={handleChange} />
        </Col>
      </FormGroup>
      <Button color="primary" onClick={handleClick}>ACTUALIZAR</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </div>


  );
}


const Altas = ({ alta }) => {
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
        <Label sm={1} > Nombre: </Label>
        <Col sm={3}>
          <Input
            id="nombre"
            name="nombre"
            type="Text" onChange={handleChange} />
        </Col>
        <Label sm={1} > Teléfono: </Label>
        <Col sm={2}>
          <Input
            id="telefono"
            name="telefono"
            type="Text" onChange={handleChange} />
        </Col>
        <Label sm={1} > Saldo: </Label>
        <Col sm={2}>
          <Input
            id="saldo"
            name="saldo"
            type="Number" onChange={handleChange} />
        </Col>
      </FormGroup>


      <Button color="primary" onClick={handleClick}>ALTA</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </div>


  );
}


const Mostrar = ({ datos, borrar }) => {
  // ESTE COMPONENTE MUESTRA LA TABLA

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
          {datos.map(e => {
            return (<tr><td><Button onClick={() => borrar(e.telefono)}>Borrar</Button></td><td>{e.telefono}</td><td>{e.nombre}</td><td>{e.saldo}</td></tr>)
          })}
        </tbody>
      </Table>
    </>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // INSERTE AQUÍ EL ESTADO NECESARIO. AQUÍ SE GUARDARÁ TODA LA INFORMACIÓN
      listaUsuarios: [
        { nombre: "Gabriel", telefono: "607666356", saldo: 10 },
        { nombre: "Usuario 2", telefono: "123456789", saldo: 100 },
        { nombre: "Usuario 3", telefono: "987654321", saldo: 1000 }
      ],
      opcion: 0,
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
  ////////////////////////
  alta = (usuario) => {
    let copiaState = this.state;

    if (!copiaState.listaUsuarios.find(e => e.telefono === usuario.telefono) && usuario.nombre !== "") {
      copiaState.listaUsuarios.push(usuario);
    }

    this.setState({ copiaState });
  }
  ////////////////////////
  cambiaOpcion = (opc) => {
    let copiaState = this.state;

    copiaState.opcion = opc;

    this.setState({ copiaState });
  }
  ////////////////////////
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
          if(e.saldo <= 0){
            e.saldo = 0;
          }
        }
      })
    }



    this.setState({ copiaState });
  }

  render() {
    let obj = [];

    if (this.state.opcion === 1) {
      obj.push(<Altas
        alta={(usuario) => this.alta(usuario)}
      />)
    } else if (this.state.opcion === 2) {
      obj.push(<Saldo
        titulo={"Añadir saldo"}
        cambiaSaldo={(usuario) => this.cambiaSaldo(usuario)}
      />)
    } else if (this.state.opcion === 3) {
      obj.push(<Saldo
        titulo={"Gastar saldo"}
        cambiaSaldo={(usuario) => this.cambiaSaldo(usuario)}
      />)
    }

    return (
      <div className="App">
        <h1>GESTION USUARIOS</h1>

        <Mostrar datos={this.state.listaUsuarios} borrar={(t) => this.borrar(t)} />
        <ButtonGroup>
          <Button color="info" onClick={() => this.cambiaOpcion(1)}>
            Alta usuario
          </Button>
          <Button color="success" onClick={() => this.cambiaOpcion(2)}>
            Sumar saldo
          </Button>
          <Button color="danger" onClick={() => this.cambiaOpcion(3)}>
            Gastar saldo
          </Button>
        </ButtonGroup>
        {obj}
      </div>
    );
  }
}
export default App;