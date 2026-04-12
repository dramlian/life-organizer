import { Todo } from "../interfaces/todo";
import { Payment } from "../interfaces/payments";

const defaultPayments: Payment[] = [
    { id: 1, content: "Plat", done: false },
    { id: 2, content: "Zdravotka socialka", done: false },
    { id: 3, content: "Uctovnicka", done: false },
    { id: 4, content: "Itnernet", done: false },
    { id: 5, content: "Mobil", done: false },
    { id: 6, content: "Inkaso", done: false },
];

const defaultTasks: Todo[] = [
    { id: 1, content: "Tvarohy", done: false },
    { id: 2, content: "Kreatin", done: false },
    { id: 3, content: "Duolingo", done: false },
    { id: 4, content: "Citat", done: false },
    { id: 5, content: "Cvicit/Pohyb", done: false },
    { id: 6, content: "Dotnet", done: false },
];

const sampleReport: string = `<b>Yesterday's Catch Up</b><p>- </p><b>Todo for Today</b><p>- </p>`;

export { defaultTasks, defaultPayments, sampleReport };