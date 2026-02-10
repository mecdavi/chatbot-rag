import { askQuestion } from '../services/ask.service.js'

export async function ask(req, res) {
  const { question } = req.body
  console.log('Pergunta recebida:', question)

  if (!question) {
    return res.status(400).json({ error: 'Pergunta obrigatória' })
  }

  const answer = await askQuestion(question)

  res.json({ answer })
}
