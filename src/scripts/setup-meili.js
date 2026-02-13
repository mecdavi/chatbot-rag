import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { meiliClient } from '../infra/meilisearch.client.js'
import 'dotenv/config'

const NOTES_DIR = path.resolve('src/notes')

async function run() {
  const index = meiliClient.index('notes')

  // cria index se não existir
  await meiliClient.createIndex('notes', { primaryKey: 'id' })
    .catch(() => {})

  await index.updateSettings({
    searchableAttributes: ['title', 'content', 'tags']
  })

  const files = await fs.readdir(NOTES_DIR)

  const docs = []

  for (const file of files) {
    try {
        if (!file.endsWith('.md')) continue
            const raw = await fs.readFile(path.join(NOTES_DIR, file), 'utf-8')

            const { data, content } = matter(raw)
            let note_id = data.id[0]
            let contentSplited = content.split('```')
            contentSplited.splice(0,2)
            contentSplited = contentSplited.join('')
            docs.push({
                id: note_id,
                title: data.title ?? file,
                tags: data.tags ?? [],
                content: contentSplited
            })
            
            // console.log(`Processando arquivo ${docs}...`)
            // let docsString = (docs.map(doc => JSON.stringify(doc))).join('\n')
            let response = await index.addDocuments(docs)


            console.log('✅ MeiliSearch pronto!')
        } catch (error) {
            console.error(`Erro ao processar o arquivo ${file}:`, error)
        }
    }
}

run().catch(console.error)
