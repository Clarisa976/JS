import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';

const ProductComponent = ({ productos, addToCart }) => {
  if (!productos || productos.length === 0) {
    return <p>No products available</p>;
  }

  return (
    <div className="container">
      <div className="row">
        {productos.map((producto, index) => (
          <div key={index} className="col-6 col-md-4 col-lg-3 mb-4">
            <Card>
              {producto.imagen_url && (
                <CardImg
                  top
                  width="100%"
                  src={producto.imagen_url}
                  alt={producto.nombre}
                />
              )}
              <CardBody>
                <CardTitle tag="h5">{producto.nombre}</CardTitle>
                <CardText>
                  <strong>Price:</strong> {producto.precio}€
                </CardText>
                {/*<CardText>{producto.descripcion}</CardText>*/}
                <Button color="success"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart(producto);
                  }}>
                  Add to Cart
                </Button>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductComponent;
