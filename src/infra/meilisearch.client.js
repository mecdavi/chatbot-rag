import { MeiliSearch } from 'meilisearch'
import 'dotenv/config'

const hostMeili = process.env.MEILI_HOST || 'http://localhost'
const portMeili = process.env.MEILI_PORT || 7700
const apiKeyMeili = process.env.MEILI_MASTER_KEY || ''
console.log(`Conectando ao MeiliSearch em ${hostMeili}:${portMeili}...`)
export const meiliClient = new MeiliSearch({
  host: `${hostMeili}:${portMeili}`,
  apiKey: apiKeyMeili // opcional
})
