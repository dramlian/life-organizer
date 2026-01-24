import { Container, Row, Col } from "react-bootstrap";
import TodoList from "../components/TodoList";

export default function Tasks() {
    return (
        <Container fluid className="h-100 p-0">
            <Row className="h-100 g-0">
                <Col md={4} className="bg-secondary">
                    <p>Sidebar</p>
                </Col>
                <Col md={8} className="bg-danger">
                    <TodoList />
                </Col>
            </Row>
        </Container>
    );
}