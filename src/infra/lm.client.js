import OpenAI from 'openai'
import 'dotenv/config'
export async function askLLM({ system, user, context }) {
  const response = await fetch(`${process.env.LLM_HOST}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: process.env.LLM_MODEL,
      temperature: 0.2,
      messages: [
        {
          role: 'system',
          content: system
        },
        {
          role: 'user',
          content: `
            Contexto:
            ${context}

            Pergunta:
            ${user}
                    `
                    }
                ]
                })
            })

  const data = await response.json()
  return data.choices[0].message.content
}
