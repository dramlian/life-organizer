'use client';

import { useState, useEffect } from "react";

export default function TodoList() {

    interface Todo {
        id: number;
        content: string;
        done: boolean;
    }

    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputTextValue, setInputTextValue] = useState<string>("");

    useEffect(() => {
        const initialTodos: Todo[] = [
            { id: 1, content: "First task", done: false },
            { id: 2, content: "Second task", done: true },
            { id: 3, content: "Third task", done: false },
        ];
        setTodos(initialTodos);
    }, []);

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

    return (
        <div>
            <h2>Todo List</h2>
            <input
                type="text"
                placeholder="New todo"
                value={inputTextValue}
                onChange={(e) => setInputTextValue(e.target.value)}
            />
            <button onClick={() => addTodo(inputTextValue)}>Add Todo</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.content} - Status: {todo.done ? "Done" : "Not Done"}
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}