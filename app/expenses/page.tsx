// app/expenses/page.tsx — stays a Server Component (no directive needed)

import { prisma } from "../lib/prisma";
import { addExpense } from "../lib/actions";

import ExpenseRow from "./expense-row";
import Insights from "./insights";

export default async function ExpensesPage() {
  const expenses = await prisma.expense.findMany();
  return (
    <main className="mx-auto max-w-2xl p-4 md:p-8">
      <h1 className="text-2xl font-semibold">Expenses</h1>

      <ul className="my-6">
        {expenses.map((e) => (
          <ExpenseRow key={e.id} expense={e} />
        ))}
      </ul>

      <form action={addExpense} className="flex gap-2">
        <input
          className="flex-1 rounded-md border border-zinc-300 px-3 py-2"
          type="text"
          name="text"
          placeholder="e.g. spent 120 on lunch"
          required
        />
        <button
          className="rounded-md bg-zinc-900 px-4 py-2 text-white"
          type="submit"
        >
          Add
        </button>
      </form>

      <Insights />
    </main>
  );
}
