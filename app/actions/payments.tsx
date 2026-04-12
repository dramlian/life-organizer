"use server";

import { Payment, PaymentDbDto } from "../interfaces/payments";
import { getDb } from "../lib/mongo";
import { requireAuth } from "../lib/auth";
import { defaultPayments } from "../lib/constants";

export async function getPaymentsByMonth(month: string): Promise<Payment[]> {
    await requireAuth();

    const db = await getDb();
    const doc = await db
        .collection<PaymentDbDto>("payments")
        .findOne({ _id: month });

    return doc?.tasks ?? [];
}

export async function updatePaymentsForMonth(month: string, payments: Payment[]): Promise<void> {
    await requireAuth();

    const db = await getDb();
    await db
        .collection<PaymentDbDto>("payments")
        .updateOne(
            { _id: month },
            { $set: { tasks: payments } },
            { upsert: true }
        );
}

export async function createDefaultPaymentsForMonth(month: string): Promise<void> {
    await requireAuth();

    const db = await getDb();
    const existing = await db
        .collection<PaymentDbDto>("payments")
        .findOne({ _id: month });

    if (existing) return;

    await db
        .collection<PaymentDbDto>("payments")
        .insertOne({ _id: month, tasks: defaultPayments });
}
