"use server";

import { NotesDbDto } from "../interfaces/notes";
import { getDb } from "../lib/mongo";
import { requireAuth } from "../lib/auth";

export async function getNotes(collectionName: string): Promise<NotesDbDto[]> {
    await requireAuth();

    const db = await getDb();
    return db
        .collection<NotesDbDto>(collectionName)
        .find()
        .toArray();
}

export async function addNote(content: string, id: string, collectionName: string, folderName: string): Promise<void> {
    await requireAuth();

    const db = await getDb();
    await db
        .collection<NotesDbDto>(collectionName)
        .insertOne({ _id: id, content: content, folderName: folderName });
}

export async function deleteNote(id: string, collectionName: string): Promise<void> {
    await requireAuth();

    const db = await getDb();
    await db
        .collection<NotesDbDto>(collectionName)
        .deleteOne({ _id: id });
}

export async function updateNote(id: string, content: string, collectionName: string): Promise<void> {
    await requireAuth();

    const db = await getDb();
    await db
        .collection<NotesDbDto>(collectionName)
        .updateOne(
            { _id: id },
            { $set: { content: content } }
        );
}