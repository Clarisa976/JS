import { Component, useEffect, useState } from "react";
import { Card, CardBody, CardText, CardTitle, Modal, ModalHeader, ModalBody, ModalFooter, Button, Alert } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
export const PIELES = [
  {
    id: 0,
    imagen: "https://pielparaartesanos.com/cdn/shop/files/Cabra_laminada_oro.jpg",
    nombre: "Cabra laminada oro",
    texto: "Cabra laminada con acabado arrugado en color oro. ",
    precio: 30
  },
  {
    id: 1,
    imagen: "https://pielparaartesanos.com/cdn/shop/files/Vacuno_encerado_lodo.jpg",
    nombre: "Vacuno encerado lodo",
    texto: "Dale un toque único y resistente a tus productos artesanales con este material de alta calidad.",
    precio: 45
  },
  {
    id: 2,
    imagen: "https://pielparaartesanos.com/cdn/shop/files/RST_420.jpg",
    nombre: "Vacuno flor burdeos",
    texto: "La piel de vacuno es la opción ideal para bolsos de calidad.",
    precio: 25
  },
  {
    id: 3,
    imagen: "https://cdn.shopify.com/s/files/1/0550/4770/9905/products/vacuno_flor_fucsia.jpg",
    nombre: "Vacuno florentik negro",
    texto: "Piel de vacuno flor en color fucsia, perfecta para añadir un toque vibrante a tus creaciones.",
    precio: 55
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
      key={e.id}
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
  const [total, setTotal] = useState(0)
  const [nombre, setNombre] = useState("")
  const [direccion, setDireccion] = useState("")
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    const totalCalculado = props.carrito
      .filter(e => e.cantidad > 0)
      .reduce((acc, e) => acc + e.cantidad * e.precio, 0);
    setTotal(totalCalculado);
  }, [props.carrito]);

  let lista = props.carrito.filter(e => e.cantidad > 0).map(e =>
    <div key={e.id}>
      <p> {e.nombre} - {e.cantidad} x {e.precio} €
        <Button onClick={() => props.modificar(e.id, 1)}>+</Button>
        <Button onClick={() => props.modificar(e.id, -1)}>-</Button>
        <br />Importe: {e.cantidad * e.precio} €
      </p>
    </div>

  );

  const handleChange = (event) => {

    const target = event.target;
    if (target.name === "nombre") {
      setNombre(target.value);
    }
    if (target.name === "direccion") {
      setDireccion(target.value);
    }
  }
  const hacerPedido = () => {
    
    if (nombre.trim() !== "" && direccion.trim() !== "") {
      props.comprar(nombre, direccion)
      setNombre("")
      setDireccion("")
      setShowAlert(false)
      props.toggle()
    } else {
      setShowAlert(true)
    }


  }
  return (
    <div>
      <Modal isOpen={props.mostrar} toggle={props.toggle} className={className} >
        <ModalHeader toggle={props.toggle}>CARRITO DE LA COMPRA</ModalHeader>
        <ModalBody>
          {lista}
          <h3>Rellene los datos para completar el pedido:</h3>
          <><label>Nombre: </label><input type="text" onChange={handleChange} placeholder="Inserte su nombre" name="nombre" /><br /><br /></>
          <><label>Dirección: </label><input type="text" onChange={handleChange} placeholder="Inserte su dirección" name="direccion" /><br /><br /></>
          El total de su pedido es: {total} €
          {showAlert && (
            <Alert color="danger" toggle={() => setShowAlert(false)}>
              Campo vacio
            </Alert>
          )}
        </ModalBody>
        <ModalFooter>

          <Button color="success" onClick={() => hacerPedido()}>COMPRAR</Button>
          <Button color="secondary" onClick={() => props.toggle()}>CERRAR</Button>
          
        </ModalFooter>
      </Modal>
    </div>
  );

}

const PedidosModal = (props) => {
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>Pedidos Realizados</ModalHeader>
      <ModalBody>
        {props.pedidos.length === 0 ? (
          <p>No hay pedidos realizados.</p>
        ) : (
          props.pedidos.map((pedido, index) => {
            const totalPedido = pedido.pedidos.reduce(
              (acum, item) => acum + item.cantidad * item.precio,
              0
            );
            return (
              <div key={index}>
                <h5>Pedido {index + 1}</h5>
                <p>
                  <strong>Nombre:</strong> {pedido.nombre}
                </p>
                <p>
                  <strong>Dirección:</strong> {pedido.direccion}
                </p>
                <p>
                  <strong>Productos:</strong>
                </p>
                {pedido.pedidos.map((item) => (
                  <p key={item.id}>
                    {item.nombre} - {item.cantidad} x {item.precio} € ={" "}
                    {item.cantidad * item.precio} €
                  </p>
                ))}
                <p>
                  <strong>Total del Pedido:</strong> {totalPedido} €
                </p>
                <hr />
              </div>
            );
          })
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={props.toggle}>
          Cerrar
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
        return { id: e.id, nombre: e.nombre, cantidad: 0, precio: e.precio }
      }),
      isOpen: false,
      pedido: [],
      mostrarPedidos: false,
    };
  }
  toggleModal() { this.setState({ isOpen: !this.state.isOpen }) }
  togglePedidos() {
    this.setState({ mostrarPedidos: !this.state.mostrarPedidos });
  }

  modificar(producto, cantidad) {
    let c = this.state.carrito
    c = c.map(e => {
      if (e.id === producto) { e.cantidad += cantidad }
      return e;
    })
    this.setState({ carrito: c })
    console.log(c)
  }
  crearPedido(nombre, direccion) {
    let copiaCarrito = this.state.carrito
      .filter(u => u.cantidad > 0).map(u => ({ ...u }));
    

    let pedido = { nombre, direccion, pedidos: copiaCarrito }

    let copiaPedido = [...this.state.pedido, pedido]
    //copiaPedido.push(pedido)

    //reinicio del carrito
    let nuevoCarrito = this.state.carrito.map(u => ({ ...u, cantidad: 0 }));

    this.setState({ pedido: copiaPedido, carrito: nuevoCarrito })
    console.log(this.state.pedido)
  }

  render() {
    let numProd = 0;
    this.state.carrito.map(e => numProd += e.cantidad)
    return (
      <>
        <Button color="primary" onClick={() => this.toggleModal()}>Carrito ({numProd})</Button>{" "}
        <Button color="success" onClick={() => this.togglePedidos()}>Pedidos</Button>
        <ShowProductos
          lista={this.state.listaProductos}
          modificar={(p, c) => this.modificar(p, c)}
        />
        <VentanaModal
          mostrar={this.state.isOpen}
          toggle={() => this.toggleModal()}
          modificar={(p, c) => this.modificar(p, c)}
          carrito={this.state.carrito}
          comprar={(nombre, direccion) => this.crearPedido(nombre, direccion)}
        />
        <PedidosModal
          isOpen={this.state.mostrarPedidos}
          toggle={() => this.togglePedidos()}
          pedidos={this.state.pedido}
        />
      </>
    );
  }
}
export default App;