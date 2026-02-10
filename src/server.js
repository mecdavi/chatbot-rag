import express from 'express'
import routes from './routes.js'
import 'dotenv/config'

const app = express()

app.use(express.json())
app.use(routes)

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'
app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`)
})
