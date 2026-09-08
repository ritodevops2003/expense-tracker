// app/expenses/expense-row.tsx — Client Component (needs state + onClick)
"use client";
import { useState } from "react";
import { deleteExpense, updateExpense } from "../lib/actions";
import { formatRupees } from "../lib/currency";

export default function ExpenseRow({
  expense,
}: {
  expense: {
    id: number;
    name: string;
    amount: number;
    category: string;
    date: Date;
  };
}) {
  const [paid, setPaid] = useState(false);

  const deleteThisOne = deleteExpense.bind(null, expense.id);

  const [editing, setEditing] = useState(false);
  const updateThisOne = updateExpense.bind(null, expense.id);

  if (editing) {
    return (
      <li className="flex items-center gap-2 border-b border-zinc-200 py-3">
        <form
          action={async (formData) => {
            await updateThisOne(formData);
            setEditing(false);
          }}
          className="flex flex-1 gap-2"
        >
          <input
            className="flex-1 rounded-md border border-zinc-300 px-3 py-2"
            name="name"
            defaultValue={expense.name}
          />
          <input
            className="w-28 rounded-md border border-zinc-300 px-3 py-2"
            name="amount"
            type="number"
            step="0.01"
            defaultValue={expense.amount}
          />
          <button
            type="submit"
            className="rounded-md bg-zinc-900 px-3 py-2 text-sm text-white"
          >
            Save
          </button>
        </form>
        <button
          onClick={() => setEditing(false)}
          className="text-sm text-zinc-500"
        >
          Cancel
        </button>
      </li>
    );
  }

  return (
   <li className="flex items-center gap-3 border-b border-zinc-200 py-3">
  <span>{expense.name}</span>

  <span className="text-sm text-zinc-500">
    {expense.category} · {expense.date.toLocaleDateString('en-GB')}
  </span>

  <span className="ml-auto tabular-nums font-medium">
    {formatRupees(expense.amount)}
  </span>

  <button onClick={() => setPaid(!paid)}
    className="text-sm text-zinc-500 hover:text-zinc-900">
    {paid ? 'Paid ✓' : 'Mark as paid'}
  </button>

  <button onClick={() => setEditing(true)}
    className="text-sm text-zinc-500 hover:text-zinc-900">Edit</button>

  <form action={deleteThisOne}>
    <button type="submit"
      className="text-sm text-zinc-400 hover:text-red-600">Delete</button>
  </form>
</li>
  );
}
