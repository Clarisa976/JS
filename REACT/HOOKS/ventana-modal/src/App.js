import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, useState } from 'react';
import {
  Alert, Row, Col, UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label
} from 'reactstrap';

const VentanaModal = (props) => {
  const { className } = props;
  const [total, setTotal] = useState('');
  const [meses, setMeses] = useState('3');
  const [tae, setTae] = useState('5%');
  const handleChange = (event) => {
    // COMPLETA ESTA FUNCION
    const { name, value } = event.target;
    if (name === "total") {
      setTotal(value);
    }
    if (name === "meses") {
      setMeses(value);
    }
    if (name === "tae") {
      setTae(value);
    }
  }
  const handleCalcular = () => {
    //comprobar que no hay campos vacios
    if (total === '') {
      alert("No dejes campos vacios D:");
      return;
    }
    props.aceptar({ total, meses, tae });
  }
  return (
    <div>
      <Modal isOpen={props.mostrar} toggle={props.toggle} className={className} onEntering={"//ESTO SE EJECUTA CUANDO MUESTRAS LA VENTANA"}>
        <ModalHeader toggle={props.toggle}>{props.titulo}</ModalHeader>
        <ModalBody>
          <FormGroup row>
            <Label sm={6} > Cantidad a pedir: </Label>
            <Col sm={12}>
              <Input onChange={handleChange}
                id="total"
                name="total"
                type="number"
                value={total} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2} > Meses: </Label>
            <Col sm={12}>
              <Input onChange={handleChange} onClick={handleChange}
                id="meses"
                name="meses"
                type="select"
                value={meses}
              >
                <option>3</option>
                <option>6</option>
                <option>9</option>
                <option>12</option>
                <option>15</option>
                <option>18</option>
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2} > TAE: </Label>
            <Col sm={12}>
              <Input onChange={handleChange} onClick={handleChange}
                id="tae"
                name="tae"
                type="select"
                value={tae}
              >
                <option>5%</option>
                <option>6%</option>
                <option>7%</option>
                <option>8%</option>
                <option>9%</option>
              </Input>
            </Col>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleCalcular}>{props.botonAceptar}</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      cuota: null,
      meses:null,
      tae:null,
    }
  }

  setIsOpen(d) {
    if (d === undefined) return;
    this.setState({ isOpen: d })
  }

  aceptar = (datos) => {
    console.log(datos)
    const total = parseFloat(datos.total);
    const meses = parseInt(datos.meses);
    const tae = parseFloat(datos.tae.replace('%', '')) / 100;

    //superformulita
    const cuota = total / (( (1 - ( 1+tae)** - meses))/tae)

    this.setState({ cuota, meses, tae: datos.tae  });
    this.toggleModal();
  }

  toggleModal = () => {
    this.setIsOpen(!this.state.isOpen)
  }
  render() {
    return (
      <div className="App">
        <Button color="outline-primary" className="mt-3" onClick={() => { this.toggleModal() }}>
          Calcula tu cuota
        </Button>


        <VentanaModal
          aceptar={(datos)=>this.aceptar(datos)}
          mostrar={this.state.isOpen}
          botonAceptar={"Calcular"}
          titulo={"CÁLCULO DE TU CUOTA"}
          toggle={this.toggleModal}
        />
        {this.state.cuota !== null && (
          <Alert color="success" className="m-3">
            Pagarás <strong>{this.state.cuota.toFixed(2)}€</strong> al mes durante <strong>{this.state.meses}</strong> meses con una TAE de <strong>{this.state.tae}</strong>
          </Alert>
        )}
      </div>
    );
  }
}

export default App;