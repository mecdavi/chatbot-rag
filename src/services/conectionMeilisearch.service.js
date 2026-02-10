import { MeiliSearch } from 'meilisearch'

export const meiliClient = new MeiliSearch({
  host: 'http://localhost:7700',
  apiKey: process.env.MEILI_API_KEY // opcional
})
