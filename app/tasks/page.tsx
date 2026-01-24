import { Container, Row, Col } from "react-bootstrap";
import TodoList from "../components/todolist/TodoList";
import { Todo } from "../interfaces/Todo";
import DaySelector from "../components/dayselector/DaySelector";

export default function Tasks() {

    //get tasks for today server function will be here, if today does not exist create it with default tasks
    const initialTodos: Todo[] = [
        { id: 1, content: "First task", done: false },
        { id: 2, content: "Second task", done: true },
        { id: 3, content: "Third task", done: false },
    ];

    //get days from server function will be here
    const days: string[] = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
    ];

    return (
        <Container fluid className="h-100 p-0">
            <Row className="h-100 g-0">
                <Col md={4} >
                    <DaySelector days={days} />
                </Col>
                <Col md={8} >
                    <TodoList injectedTodos={initialTodos} />
                </Col>
            </Row>
        </Container>
    );
}