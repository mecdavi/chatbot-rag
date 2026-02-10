import { meiliClient  } from '../services/conectionMeilisearch.service.js'

class SearchEngineController {
    async search(req, res) {
        const index = meiliClient.index('notes')
        await index.updateSettings({
            searchableAttributes: ['title', 'content', 'tags'],
            filterableAttributes: ['tags']
        })
    }
    async addDocument(req, res) {
        const index = meiliClient.index('notes')
        const document = {
            id: 1,
            title: 'My first note',
            content: 'This is the content of my first note.',
            tags: ['personal', 'todo']
        }
        const response = await index.addDocuments([document])
        res.json(response)
    }
} 
export default new SearchEngineController()
// module.exports = SearchEngineController