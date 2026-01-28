"use server";

import { TodoDbDto, Todo } from "../interfaces/todo";
import { getDb } from "../lib/mongo";
import { defaultTasks } from "../lib/constants";


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
    if ((await getTasksByDate(date)).length > 0) return;

    if (await db
        .collection<TodoDbDto>("tasks")
        .findOne({ _id: date })) {
        return;
    }

    await db
        .collection<TodoDbDto>("tasks")
        .insertOne({ _id: date, tasks: defaultTasks });
}

