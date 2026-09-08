// app/expenses/expense-row.tsx — Client Component (needs state + onClick)
"use client";
import { useState } from "react";

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

  return (
    <li>
      {expense.name} ({expense.category}) : ${expense.amount} —{" "}
      {expense.date.toLocaleDateString()}
      <button onClick={() => setPaid(!paid)}>
        {paid ? "Paid ✓" : "Mark as paid"}
      </button>
    </li>
  );
}
