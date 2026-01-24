'use client';

import { useState, useEffect } from "react";
import { Todo } from "../interfaces/Todo"

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