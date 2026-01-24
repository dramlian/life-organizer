import { Container, Row, Col } from "react-bootstrap";
import TodoList from "../components/todolist/TodoList";
import { Todo } from "../interfaces/Todo";

export default function Tasks() {
    const initialTodos: Todo[] = [
        { id: 1, content: "First task", done: false },
        { id: 2, content: "Second task", done: true },
        { id: 3, content: "Third task", done: false },
    ];
    return (
        <Container fluid className="h-100 p-0">
            <Row className="h-100 g-0">
                <Col md={4} className="bg-secondary">
                    <p>Sidebar</p>
                </Col>
                <Col md={8} className="bg-danger">
                    <TodoList injectedTodos={initialTodos} />
                </Col>
            </Row>
        </Container>
    );
}