"use server";

import { WorkoutDbDto } from "../interfaces/workouts";
import { getDb } from "../lib/mongo";
import { requireAuth } from "../lib/auth";

export async function getWorkouts(): Promise<WorkoutDbDto[]> {
    await requireAuth();

    const db = await getDb();
    return db
        .collection<WorkoutDbDto>("workouts")
        .find()
        .toArray();
}

export async function addWorkout(content: string, id: string): Promise<void> {
    await requireAuth();

    const db = await getDb();
    await db
        .collection<WorkoutDbDto>("workouts")
        .insertOne({ _id: id, content: content });
}

export async function deleteWorkout(id: string): Promise<void> {
    await requireAuth();

    const db = await getDb();
    await db
        .collection<WorkoutDbDto>("workouts")
        .deleteOne({ _id: id });
}

export async function updateWorkout(id: string, content: string): Promise<void> {
    await requireAuth();

    const db = await getDb();
    await db
        .collection<WorkoutDbDto>("workouts")
        .updateOne(
            { _id: id },
            { $set: { content: content } }
        );
}