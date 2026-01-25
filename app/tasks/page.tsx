'use client';

import { Container, Row, Col } from "react-bootstrap";
import TodoList from "../components/todolist/TodoList";
import { Todo } from "../interfaces/Todo";
import DaySelector from "../components/dayselector/DaySelector";
import { useEffect, useState } from "react";
import { getTasksByDate, updateTasksForDate, createDefaultTasksForDate } from "../actions/tasks";

export default function Tasks() {
    const today = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState<string>(today);
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const todos = await getTasksByDate(selectedDate);
            if (todos.length === 0) {
                await createDefaultTasksForDate(selectedDate);
                const defaultTodos = await getTasksByDate(selectedDate);
                setTodos(defaultTodos);
                return;
            }
            setTodos(todos);
        };

        fetchTasks();
    }, [selectedDate]);


    useEffect(() => {
        updateTasksForDate(selectedDate, todos);
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