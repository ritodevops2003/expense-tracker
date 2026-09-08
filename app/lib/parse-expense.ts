// app/lib/parse-expense.ts

import OpenAI from "openai";
import { z } from "zod"
import { zodTextFormat } from "openai/helpers/zod";


const client = new OpenAI()

const ExpenseSchema = z.object({
    name: z.string().nullable(),
    amount: z.number().nullable(),
    category: z.enum([
        'Food & Drink',
        'Transport',
        'Housing',
        'Health',
        'Entertainment',
        'Shopping',
        'Other',
    ])
})

export async function parseExpense(text:string) {
    const response = await client.responses.parse({
        model: "gpt-5.6-luna",
        input: [
            {
                role: 'system',
                content: 'Extract a single expense from the text. "name" is a short description of what was bought. "amount" is the numeric value only, without a currency symbol. If the text contains no amount, set amount to null rather than guessing.',

            },
            { role: 'user', content: text }
        ],
        text: {
            format: zodTextFormat(ExpenseSchema, 'expense')
        }
    })
    return response.output_parsed
}