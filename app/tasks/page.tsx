'use client';

import { Container, Row, Col } from "react-bootstrap";
import TodoList from "../components/todolist/TodoList";
import { Todo } from "../interfaces/Todo";
import DaySelector from "../components/dayselector/DaySelector";
import { useEffect, useState } from "react";

export default function Tasks() {
    const today = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState<string>(today);

    const initialTodos: Todo[] = [
        { id: 1, content: "First task", done: false },
        { id: 2, content: "Second task", done: true },
        { id: 3, content: "Third task", done: false },
    ];

    const [todos, setTodos] = useState<Todo[]>(initialTodos);

    useEffect(() => {
        // This effect could be used to fetch todos for the selected date
        alert(todos);
    }, [todos]);


    return (
        <Container fluid className="h-100 p-0">
            <Row >
                <Col md={12} >
                    <DaySelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
                </Col>
            </Row>
            <Row >
                <Col md={12} >
                    <TodoList injectedTodos={todos} setTodos={setTodos} />
                </Col>
            </Row>
        </Container>
    );
}