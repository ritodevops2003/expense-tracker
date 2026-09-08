// app/lib/parse-expense.ts

import OpenAI from "openai";
import { z } from "zod";
import { zodTextFormat } from "openai/helpers/zod";

const client = new OpenAI();

const ExpenseSchema = z.object({
  name: z.string().nullable(),
  amount: z.number().nullable(),
  category: z.enum([
    "Food & Drink",
    "Transport",
    "Housing",
    "Health",
    "Entertainment",
    "Shopping",
    "Other",
  ]),
  date: z.string().nullable(), // ISO date, e.g. "2026-09-08"
});

export async function parseExpense(text: string) {
  const today = new Date().toISOString().split("T")[0];

  const response = await client.responses.parse({
    model: "gpt-5.6-luna",
    input: [
      {
        role: "system",
        content:
          `Today date is ${today}. ` +
          'Extract a single expense from the text. "name" is a short description of what was bought. ' +
          '"amount" is the numeric value only, without a currency symbol. ' +
          'Amounts are in Indian rupees — treat "rs", "rupees", "₹" and a bare number the same. ' +
          "If the text contains no amount, set amount to null rather than guessing. " +
          "If the text does not describe what was bought, set name to null. " +
          '"date" is an ISO date (YYYY-MM-DD) resolved relative to today — "yesterday", ' +
          '"last Friday" and similar should become actual dates. If no date is mentioned, set it to null.',
      },
      { role: "user", content: text },
    ],
    text: {
      format: zodTextFormat(ExpenseSchema, "expense"),
    },
  });
  return response.output_parsed;
}
