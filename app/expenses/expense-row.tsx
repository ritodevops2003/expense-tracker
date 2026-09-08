// app/expenses/expense-row.tsx — Client Component (needs state + onClick)
"use client";
import { useState } from "react";
import { deleteExpense, updateExpense } from "../lib/actions"

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

  const deleteThisOne = deleteExpense.bind(null, expense.id)

  const [editing, setEditing] = useState(false)
  const updateThisOne = updateExpense.bind(null, expense.id)

  if (editing){
    return(
      <li>
        <form 
          action={async (formData)=>{
            await updateThisOne(formData)
            setEditing(false)
          }}>
              <input name="name" defaultValue={expense.name} />
              <input name="amount" type="number" step="0.01" defaultValue={expense.amount} />
              <button type="submit">Save Action</button>
        </form>
        <button onClick={() => setEditing(false) }>Cancel</button>
      </li>
    )
  }

  return (
    <li>
      {expense.name} ({expense.category}) : ${expense.amount} —{" "}
      <form action={deleteThisOne}>
        <button type='submit'>Delete</button>
      </form>
      {expense.date.toLocaleDateString('en-GB')}
      <button onClick={() => setPaid(!paid)}>
        {paid ? "Paid ✓" : "Mark as paid"}
      </button>

      <button onClick={() => setEditing(true)}>Edit</button>
    </li>
  );
}
