// app/expenses/insights.tsx
"use client";

import { useActionState } from "react";
import { askInsights } from "../lib/insights";
import Markdown from "react-markdown";

export default function Insights() {
  const [answer, formAction, isPending] = useActionState(askInsights, "");

  return (
    <div className="mt-8 border-t border-zinc-200 pt-6">
      <form action={formAction} className="flex gap-2">
        <input
          className="flex-1 rounded-md border border-zinc-300 px-3 py-2"
          type="text"
          name="question"
          placeholder="Ask about your spending"
          required
        />
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-zinc-900 px-4 py-2 text-white disabled:opacity-50"
        >
          {isPending ? "Thinking…" : "Ask"}
        </button>
      </form>

      {answer && (
        <div className="mt-4 text-sm">
          <Markdown>{answer}</Markdown>
        </div>
      )}
    </div>
  );
}
