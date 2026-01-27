import { Col, Row, Container } from "react-bootstrap";

export default function Workouts() {
    return (
        <Container>
            <Row>
                <Col md={4} style={{ height: '100vh', backgroundColor: '#fc0000' }}>

                </Col>
                <Col md={8} style={{ height: '100vh', backgroundColor: '#7700ff' }}>
                    <Row>
                        <p>RTE</p>
                    </Row>
                    <Row>
                        <p>RTE</p>
                    </Row>
                </Col>
            </Row>


        </Container>
    );
}