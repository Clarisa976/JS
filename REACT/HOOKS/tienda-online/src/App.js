import { Component } from "react";
import { Card, CardBody, CardText, CardTitle, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
export const PIELES = [
  {
    id: 0,
    imagen: "https://pielparaartesanos.com/cdn/shop/files/Cabra_laminada_oro.jpg",
    nombre: "Cabra laminada oro",
    texto: "Cabra laminada con acabado arrugado en color oro. "
  },
  {
    id: 1,
    imagen: "https://pielparaartesanos.com/cdn/shop/files/Vacuno_encerado_lodo.jpg",
    nombre: "Vacuno encerado lodo",
    texto: "Dale un toque único y resistente a tus productos artesanales con este material de alta calidad."
  },
  {
    id: 2,
    imagen: "https://pielparaartesanos.com/cdn/shop/files/RST_420.jpg",
    nombre: "Vacuno flor burdeos",
    texto: "La piel de vacuno es la opción ideal para bolsos de calidad."
  }
];



function Producto(props) {
  return (
    <Card style={{ width: '18rem' }}>
      <img src={props.img} alt={props.nombre} />
      <CardBody>
        <CardTitle tag="h5"> {props.nombre} </CardTitle>
        <CardText>{props.texto} </CardText>
        <Button color="primary" onClick={() => props.clicar(props.id, 1)} > Comprar </Button>
      </CardBody>
    </Card>
  )
}

function ShowProductos(props) {
  let lista = props.lista.map(e =>
    <Producto
      id={e.id}
      img={e.imagen}
      nombre={e.nombre}
      texto={e.texto}
      clicar={(p, c) => props.modificar(p, c)}
    />

  )
  return <>{lista}</>;

}

const VentanaModal = (props) => {
  const { className } = props;
  let lista = props.carrito.filter(e => e.cantidad > 0).map(e =>
    <div key={e.id}>
      <p> {e.nombre} - {e.cantidad}
        <Button onClick={() => props.modificar(e.id, 1)}>+</Button>
        <Button onClick={() => props.modificar(e.id, -1)}>-</Button>
      </p>
    </div>
  )
  return (
    <div>
      <Modal isOpen={props.mostrar} toggle={props.toggle} className={className} >
        <ModalHeader toggle={props.toggle}>CARRITO DE LA COMPRA</ModalHeader>
        <ModalBody>{lista.length > 0 ? lista : "No hay artículos en el carrito"}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.openCompraModal}>
            Comprar
          </Button>
          <Button color="secondary" onClick={props.toggle}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

const ModalCompra = (props) => {
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>Datos de Compra</ModalHeader>
      <ModalBody>
        <form>
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              className="form-control"
              value={props.name}
              onChange={props.handleNameChange}
            />
          </div>
          <div className="form-group">
            <label>Dirección</label>
            <input
              type="text"
              className="form-control"
              value={props.address}
              onChange={props.handleAddressChange}
            />
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={props.submitCompra}>
          Confirmar Compra
        </Button>
        <Button color="secondary" onClick={props.toggle}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaProductos: PIELES,
      carrito: PIELES.map(e => {
        return { id: e.id, nombre: e.nombre, cantidad: 0 }
      }),
      isOpen: false,
    };
  }
  toggleModal() { this.setState({ isOpen: !this.state.isOpen }) }

  modificar(producto, cantidad) {
    let c = this.state.carrito
    c = c.map(e => {
      if (e.id === producto) { e.cantidad += cantidad }
      return e;
    })
    this.setState({ carrito: c })
    console.log(c)
  }

  render() {
    let numProd = 0;
    this.state.carrito.map(e => numProd += e.cantidad)
    return (
      <>
        <Button color="primary" onClick={() => this.toggleModal()}>Carrito ({numProd})</Button>
        <ShowProductos
          lista={this.state.listaProductos}
          modificar={(p, c) => this.modificar(p, c)}
        />
        <VentanaModal
          mostrar={this.state.isOpen}
          toggle={() => this.toggleModal()}
          modificar={(p, c) => this.modificar(p, c)}
          carrito={this.state.carrito}
        />
        <ModalCompra
          mostrar={this.state.isOpen}
          toggle={() => this.toggleModal()}
          name={this.state.formName}
          address={this.state.formAddress}
          handleNameChange={this.handleNameChange}
          handleAddressChange={this.handleAddressChange}
          submitCompra={this.handleCompraSubmit}
        />
      </>
    );
  }
}
export default App;