"use server";

import { ReportDbDto } from "../interfaces/Report";
import { getDb } from "../lib/mongo";
import { sampleReport } from "../lib/constants";

export async function getReportByDate(date: string): Promise<string | null> {

    const db = await getDb();

    const report = await db
        .collection<ReportDbDto>("reports")
        .findOne({ _id: date });

    return report?.content ?? null;
}

export async function updateReportForDate(date: string, content: string): Promise<void> {

    const db = await getDb();

    await db
        .collection<ReportDbDto>("reports")
        .updateOne(
            { _id: date },
            { $set: { content: content } },
            { upsert: true }
        );
}

export async function createDefaultReportForDate(date: string): Promise<void> {

    const db = await getDb();

    if ((await getReportByDate(date)) !== null) return;

    if (await db
        .collection<ReportDbDto>("reports")
        .findOne({ _id: date })) {
        return;
    }

    await db
        .collection<ReportDbDto>("reports")
        .insertOne({ _id: date, content: sampleReport });
}