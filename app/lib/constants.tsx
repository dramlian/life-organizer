import { Todo } from "../interfaces/todo";

const defaultTasks: Todo[] = [
    { id: 1, content: "Tvarohy", done: false },
    { id: 2, content: "Kreatin", done: false },
    { id: 3, content: "Duolingo", done: false },
    { id: 4, content: "Citat", done: false },
    { id: 5, content: "Cvicit/Pohyb", done: false },
    { id: 6, content: "Dotnet", done: false },
];

const sampleReport: string = `<b>Yesterday's Catch Up</b><p>- </p><b>Todo for Today</b><p>- </p>`;

export { defaultTasks, sampleReport };