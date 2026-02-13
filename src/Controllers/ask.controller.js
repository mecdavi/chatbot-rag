import { askQuestion,questionProcessing,questionValidator } from '../services/ask.service.js'
import { queryBuilder } from '../services/meiliSearch.service.js'

import 'dotenv/config'

export async function ask(req, res) {
  const { question } = req.body
  console.log('Pergunta recebida:', question)

  if (!question) {
    return res.status(400).json({ error: 'Pergunta obrigatória' })
  }

  const optimizedQuestion = await questionProcessing(question)
  const context = await queryBuilder(optimizedQuestion)
  const isValid = await questionValidator(question,context)
  console.log('Validação da pergunta:', context)
  if (!eval(isValid) || !context) {
    return res.json({ answer: 'Desculpe, não tenho informações suficientes para responder a essa pergunta.' })
  }
  // console.log('Pergunta otimizada para busca:', isValid,context)
  // return
  const answer = await askQuestion(question,optimizedQuestion)

  res.json({ answer })
}
