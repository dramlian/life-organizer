'use client';

import { Container, Row, Col } from "react-bootstrap";
import TodoList from "../components/todolist/TodoList";
import { Todo } from "../interfaces/todo";
import DaySelector from "../components/dayselector/DaySelector";
import { useEffect, useState } from "react";
import { getTasksByDate, updateTasksForDate, createDefaultTasksForDate } from "../actions/tasks";
import LoadingSpinner from "../components/loading/LoadingSpinner";

export default function Tasks() {
    const today = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState<string>(today);
    const [todos, setTodos] = useState<Todo[] | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            const todos = await getTasksByDate(selectedDate);
            if (todos.length === 0) {
                await createDefaultTasksForDate(selectedDate);
                const defaultTodos = await getTasksByDate(selectedDate);
                setTodos(defaultTodos);
                return;
            } else {
                setTodos(todos);
            }
        };

        fetchTasks();
    }, [selectedDate]);


    useEffect(() => {
        if (todos !== null) {
            updateTasksForDate(selectedDate, todos);
        }
    }, [todos]);

    return (
        <Container fluid className="h-100 p-0" style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
            <Row className="g-0">
                <Col md={12}>
                    <DaySelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
                </Col>
            </Row>
            <Row className="g-0">
                <Col md={12}>
                    {todos === null ? <LoadingSpinner /> : <TodoList injectedTodos={todos} setTodos={setTodos} />}
                </Col>
            </Row>
        </Container>
    );
}