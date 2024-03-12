"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db/drizzle";
import { payment } from "@/db/schema";
import { PaymentType } from "@/types/payment";

export const getData = async () => {
  const data = await db.select().from(payment);
  return data;
};

export const addPayment = async (data: PaymentType) => {
  await db.insert(payment).values(data);
  revalidatePath("/");
};

export const deletePayment = async (id: number) => {
  await db.delete(payment).where(eq(payment.id, id));

  revalidatePath("/");
};

export const togglePayment = async (id: number, done: boolean) => {
  await db
    .update(payment)
    .set({
      done: done,
    })
    .where(eq(payment.id, id));

  revalidatePath("/");
};

export const editPayment = async (id: number, title: string) => {
  await db
    .update(payment)
    .set({
      title
    })
    .where(eq(payment.id, id));

  revalidatePath("/");
};
