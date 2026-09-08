// app/expenses/insights.tsx
'use client'

import { useActionState } from 'react'
import { askInsights } from '../lib/insights'
import Markdown from 'react-markdown'

export default function Insights(){
    const [answer, formAction, isPending] = useActionState(askInsights, '')

    return (
        <div>
            <form action={formAction}>
                <input 
                type="text" 
                name='question'
                placeholder='e.g. how much did i spend on food'
                required
                />
                <button type='submit' disabled={isPending}>
                    {isPending ? "Thinking..." : "Ask"}
                </button>
            </form>

            {answer &&<Markdown>{answer}</Markdown>}
        </div>
    )
}