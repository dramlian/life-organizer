"use server";

import { TodoDbDto, Todo } from "../interfaces/Todo";
import { getDb } from "../lib/mongo";


export async function getTasksByDate(date: string): Promise<Todo[]> {

    const db = await getDb();

    const day = await db
        .collection<TodoDbDto>("tasks")
        .findOne({ _id: date });

    return day?.tasks ?? [];
}


export async function updateTasksForDate(date: string, tasks: Todo[]): Promise<void> {

    const db = await getDb();

    await db
        .collection<TodoDbDto>("tasks")
        .updateOne(
            { _id: date },
            { $set: { tasks: tasks } },
            { upsert: true }
        );
}


export async function createDefaultTasksForDate(date: string): Promise<void> {

    const db = await getDb();

    const defaultTasks: Todo[] = [
        { id: 1, content: "Sample Task 1", done: false },
        { id: 2, content: "Sample Task 2", done: false },
    ];

    if ((await getTasksByDate(date)).length > 0) return;


    if (await db
        .collection<TodoDbDto>("tasks")
        .findOne({ _id: date })) {
        return await updateTasksForDate(date, defaultTasks);
    }

    await db
        .collection<TodoDbDto>("tasks")
        .insertOne({ _id: date, tasks: defaultTasks });
}

