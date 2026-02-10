import { meiliClient } from '../infra/meilisearch.client.js'
import { askLLM } from '../infra/lm.client.js'
import 'dotenv/config'

export async function askQuestion(question) {
  const index = meiliClient.index(process.env.SEARCH_INDEX)

  const searchResult = await index.search(question, { limit: 3 })

  const context = searchResult.hits
    .map(doc => `### ${doc.title}\n${doc.content}`)
    .join('\n\n')

  return askLLM({
    system: 'Você é um assistente interno que responde apenas com base no contexto fornecido.',
    user: question,
    context
  })
}
