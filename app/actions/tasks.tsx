"use server";

import { MongoClient } from "mongodb";
import { TodoDbDto, Todo } from "../interfaces/Todo";

const uri = "mongodb://admin:adminpassword@localhost:27017/?authSource=admin";

export async function getTasksByDate(date: string): Promise<TodoDbDto["tasks"]> {

    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("life_organizer");

    const day = await db
        .collection<TodoDbDto>("tasks")
        .findOne({ _id: date });

    await client.close();

    return day?.tasks ?? [];
}


export async function updateTasksForDate(date: string, tasks: Todo[]): Promise<void> {

    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("life_organizer");

    await db
        .collection<TodoDbDto>("tasks")
        .updateOne(
            { _id: date },
            { $set: { tasks: tasks } },
            { upsert: true }
        );

    await client.close();
}


