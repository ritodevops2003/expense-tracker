// app/lib/insights.ts
"use server";

import OpenAI from "openai";
import { prisma } from "./prisma";

const client = new OpenAI();

export async function askInsights(prevState: string, formData: FormData) {
  const question = formData.get("question") as string;
  const expenses = await prisma.expense.findMany();

  const response = await client.responses.create({
    model: "gpt-6-astra",
    input: [
      {
        role: "system",
        content:
          "You answer questions about the user's expenses using ONLY the JSON data below. " +
          "Do all arithmetic from these rows. If the data does not contain the answer, say so plainly — " +
          "never estimate, extrapolate, or invent figures.\n\n" +
          JSON.stringify(expenses),
      },
      { role: 'user', content: question }
    ],
  })

  return response.output_text
}
