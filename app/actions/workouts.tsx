"use server";

import { WorkoutDbDto } from "../interfaces/Workouts";
import { getDb } from "../lib/mongo";


export async function getWorkouts(): Promise<WorkoutDbDto[]> {
    const db = await getDb();

    return db
        .collection<WorkoutDbDto>("workouts")
        .find()
        .toArray();
}

export async function addWorkout(content: string, id: string): Promise<void> {
    const db = await getDb();

    await db
        .collection<WorkoutDbDto>("workouts")
        .insertOne({ _id: id, content: content });
}

export async function deleteWorkout(id: string): Promise<void> {
    const db = await getDb();

    await db
        .collection<WorkoutDbDto>("workouts")
        .deleteOne({ _id: id });
}

export async function updateWorkout(id: string, content: string): Promise<void> {
    const db = await getDb();

    await db
        .collection<WorkoutDbDto>("workouts")
        .updateOne(
            { _id: id },
            { $set: { content: content } }
        );
}