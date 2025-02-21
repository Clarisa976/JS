import { Card, CardImg, CardBody, CardTitle, CardText, Row, Col } from 'reactstrap';

const Flashcard = (props) => {
    return (
        <>

            <Card>
                <Row>
                    <Col className="bg-light border"
                        md={{
                            offset: 1,
                            size: 2
                        }}
                        sm="6">
                        <CardImg src={props.imagen} />
                
                <CardBody>
                    <CardTitle tag="h5">{props.titulo}</CardTitle>
                </CardBody>
                <CardBody>
                    <CardText>{props.texto}</CardText>
                </CardBody>
                </Col>
                </Row>
            </Card>

        </>
    );
}
export default Flashcard;