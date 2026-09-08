// app/lib/actions.ts
"use server";

import { prisma } from "./prisma";
import { parseExpense } from "./parse-expense";
// import { categorize } from "./categorize"
// import { expenses } from './data'
import { revalidatePath } from "next/cache";

export async function addExpense(formData: FormData) {
  const text = formData.get("text") as string;

  const parsed = await parseExpense(text);
  if (!parsed || parsed.amount === null || parsed.name === null) return; // couldn't understand it — don't invent data

  // const category = await categorize(name)
  // expenses.push({ id:Date.now(), name, amount })
  await prisma.expense.create({ data: { ...parsed, name: parsed.name, amount: parsed.amount, date: parsed.date ? new Date(parsed.date) : new Date() } });

  revalidatePath("/expenses"); // tell Next.js this page's data changed
}
