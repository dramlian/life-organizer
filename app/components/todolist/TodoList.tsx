'use client';

import { useState, useEffect } from "react";
import { Todo } from "../../interfaces/todo"
import InputGroup from "react-bootstrap/esm/InputGroup";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import { Col, Container, Row } from "react-bootstrap";
import "./todolist.css";

export default function TodoList({ injectedTodos, setTodos }: { injectedTodos: Todo[] | null, setTodos: React.Dispatch<React.SetStateAction<Todo[] | null>> }) {

    const [inputTextValue, setInputTextValue] = useState<string>("");

    useEffect(() => {
        setTodos(injectedTodos);
    }, [injectedTodos]);

    function deleteTodo(id: number) {
        if (injectedTodos === null) return;
        setTodos(injectedTodos.filter(todo => todo.id !== id));
    }

    function addTodo(content: string) {
        if (injectedTodos === null) return;
        const newTodo: Todo = {
            id: Date.now(),
            content,
            done: false,
        };
        setTodos([...injectedTodos, newTodo]);
        setInputTextValue("");
    }

    function markTodo(id: number) {
        if (injectedTodos === null) return;
        setTodos(injectedTodos.map(todo => {
            if (todo.id === id) {

                if (todo.done) {
                    return { ...todo, done: false };
                } else {
                    return { ...todo, done: true };
                }

            }
            return todo;
        }));
    }

    function editTodo(id: number, content: string) {
        if (injectedTodos === null) return;
        setTodos(injectedTodos.map(todo => {
            if (todo.id === id) {
                return { ...todo, content };
            }
            return todo;
        }));
    }

    return (
        <Container>
            <Row className="mt-3">
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Checkbox aria-label="Placeholder checkbox" style={{ visibility: 'hidden' }} disabled />
                        <Form.Control
                            placeholder="Task name"
                            aria-label="Task name"
                            aria-describedby="basic-addon2"
                            value={inputTextValue}
                            onChange={(e) => setInputTextValue(e.target.value)}
                        />
                        <Button variant="outline-secondary" id="button-addon2" onClick={() => addTodo(inputTextValue)}>
                            Add Todo
                        </Button>
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ul style={{ padding: 0, listStyle: 'none' }}>
                        {injectedTodos !== null && [...injectedTodos].sort((a, b) => {
                            if (a.done && !b.done) return 1;
                            if (!a.done && b.done) return -1;
                            return 0;
                        }).map((todo) => (
                            <li key={todo.id}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Checkbox aria-label="Checkbox for following text input" checked={todo.done} onChange={(e) => markTodo(todo.id)} />

                                    <Form.Control aria-label="Text input with checkbox" readOnly={todo.done} value={todo.content} onChange={(e) => editTodo(todo.id, e.target.value)} style={todo.done ? { textDecoration: 'line-through' } : {}} />
                                    <Button variant="outline-danger" onClick={() => deleteTodo(todo.id)}>Delete</Button>
                                </InputGroup>
                            </li>
                        ))}
                    </ul>
                </Col>
            </Row>
        </Container>
    );
}