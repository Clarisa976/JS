// ProductComponent.js
import React from 'react';
import { Card, CardBody, CardTitle, CardText, CardImg } from 'reactstrap';

const ProductComponent = ({ productos }) => {
  if (!productos || productos.length === 0) {
    return <p>No products available</p>;
  }

  return (
    <div className="container">
      <div className="row">
        {productos.map(producto => (
          <div key={producto.id} className="col-md-4 mb-4">
            <Card>
              {/* Si el objeto tiene una propiedad "foto", se muestra la imagen */}
              {producto.foto && (
                <CardImg top width="100%" src={producto.foto} alt={producto.nombre} />
              )}
              <CardBody>
                <CardTitle tag="h5">{producto.nombre}</CardTitle>
                  <CardText><strong>Price:</strong> {producto.precio}</CardText>
                <CardText>{producto.descripcion}</CardText>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductComponent;
