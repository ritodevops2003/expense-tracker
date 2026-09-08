// app/expenses/page.tsx — stays a Server Component (no directive needed)

import { prisma } from "../lib/prisma"
import { addExpense } from "../lib/actions"

import ExpenseRow from './expense-row'
import Insights from "./insights"


export default async function ExpensesPage() {
    const expenses = await prisma.expense.findMany()
  return (
    <div>
        <ul>
      {expenses.map((e) => (
        <ExpenseRow key={e.id} expense={e} />
      ))}
    </ul>

      <form action={addExpense}>
        <input 
          type="text"
          name="text"
          placeholder="e.g. spend 12 on lunch at Pret"
          required
        />
        <button type="submit">Add</button>
      </form>
      <Insights />
    </div>
    
  )
}