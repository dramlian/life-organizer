'use client';

import { Container, Row, Col } from "react-bootstrap";
import TodoList from "../components/todolist/TodoList";
import { Todo } from "../interfaces/todo";
import DaySelector from "../components/dayselector/DaySelector";
import { useEffect, useRef, useState } from "react";
import { getTasksByDate, updateTasksForDate, createDefaultTasksForDate } from "../actions/tasks";
import LoadingSpinner from "../components/loading/LoadingSpinner";

export default function Tasks() {
    const today = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState<string>(today);
    const [todos, setTodos] = useState<Todo[] | null>(null);
    const isLoadingRef = useRef(false);

    useEffect(() => {
        const fetchTasks = async () => {
            isLoadingRef.current = true;
            setTodos(null);
            const fetched = await getTasksByDate(selectedDate);
            if (fetched.length === 0) {
                await createDefaultTasksForDate(selectedDate);
                const defaultTodos = await getTasksByDate(selectedDate);
                setTodos(defaultTodos);
            } else {
                setTodos(fetched);
            }
            isLoadingRef.current = false;
        };

        fetchTasks();
    }, [selectedDate]);


    useEffect(() => {
        if (todos !== null && !isLoadingRef.current) {
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