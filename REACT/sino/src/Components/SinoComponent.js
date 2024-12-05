import React from 'react';
import { Card,CardTitle,CardSubtitle,CardText, CardImg, CardBody, Button, Spinner,Row,Col } from "reactstrap";
const Sino = (props) => {
    return (
        <>
            <div>
                <Button color="success">SINO</Button>
            </div>
            <div>
                <Spinner color="info" >
                    Loading...
                </Spinner>
            </div>
            <div>
                <Row>
                    <Col></Col>
                    <Col>
                <Card
                    style={{
                        width: '18rem'
                    }}
                >
                    <h1>{props.titulo}</h1>
                    <CardImg
                    top
                    
                        alt={props.imagenAlt}
                        src={props.imagen}
                    />
                    <CardBody>
                        
                        <Button>
                            YES
                        </Button>
                        &nbsp;
                        <Button>
                            NO
                        </Button>
                    </CardBody>
                </Card>
                </Col>
                <Col></Col>
                </Row>
                
            </div>
        </>
    );
}
/*function Sino(props){
    return(
        <div>
            <Button>SINO</Button>
        </div>
    );
}*/
export default Sino;