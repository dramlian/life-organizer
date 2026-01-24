'use client';

import { useState, useEffect } from "react";
import { Todo } from "../../interfaces/Todo"
import InputGroup from "react-bootstrap/esm/InputGroup";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import { Col, Container, Row } from "react-bootstrap";

export default function TodoList({ injectedTodos }: { injectedTodos: Todo[] }) {

    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputTextValue, setInputTextValue] = useState<string>("");

    useEffect(() => {
        setTodos(injectedTodos);
    }, [injectedTodos]);

    function deleteTodo(id: number) {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    function addTodo(content: string) {
        const newTodo: Todo = {
            id: todos.length + 1,
            content,
            done: false,
        };
        setTodos([...todos, newTodo]);
    }

    function markTodo(id: number) {
        setTodos(todos.map(todo => {
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

    return (
        <Container>
            <Row className="mt-3">
                <Col>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
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
                    <ul>
                        {todos.map((todo) => (
                            <li key={todo.id}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Checkbox aria-label="Checkbox for following text input" checked={todo.done} onChange={(e) => markTodo(todo.id)} />

                                    <Form.Control aria-label="Text input with checkbox" readOnly={true} value={todo.content} onChange={(e) => { }} />
                                    <Button variant="outline-primary" onClick={() => deleteTodo(todo.id)}>Delete</Button>
                                </InputGroup>
                            </li>
                        ))}
                    </ul>
                </Col>
            </Row>
        </Container>
    );
}