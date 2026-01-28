import { Todo } from "../interfaces/todo";

const defaultTasks: Todo[] = [
    { id: 1, content: "Tvarohy", done: false },
    { id: 2, content: "Kreatin", done: false },
    { id: 3, content: "Duolingo", done: false },
    { id: 4, content: "Citat", done: false },
    { id: 5, content: "Cvicit/Pohyb", done: false },
];

const sampleReport: string = `<h3>Yesterday's Catch Up</h3><p>- </p><h3>Todo for Today</h3><p>- </p>`;

export { defaultTasks, sampleReport };