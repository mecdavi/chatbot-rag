import 'dotenv/config'
import { meiliClient } from '../infra/meilisearch.client.js'

export async function getAllDocuments() {
  const index = meiliClient.index(process.env.SEARCH_INDEX)
  const searchResult = await index.search('', { limit: 3 })
  return searchResult.hits
}

export async function queryBuilder(query) {

  const index = meiliClient.index(process.env.SEARCH_INDEX)
  const searchResult = await index.search(query, { limit: 3 })
  searchResult.hits
  const context = searchResult.hits
    .map(doc => `### ${doc.title}\n${doc.content}`)
    .join('\n\n')

    // console.log('Search Result:', context)

  return context
}