import { askLLM } from '../infra/lm.client.js'
import { queryBuilder } from './meiliSearch.service.js'
import 'dotenv/config'

export async function askQuestion(question,keywords) {
  const context = await queryBuilder(keywords)
  return askLLM({
    system: `Você é um assistente interno que responde apenas com base no context fornecido; 
            Se o context não tiver a resposta, diga que não sabe, não tente inventar uma resposta.; 
            Não invente informações;
      `,
    user: question,
    context
  })
}
export async function questionProcessing(question) {

  return askLLM({
    system: `Extraia apenas termos técnicos relevantes para busca;
            Não invente palavras-chave, apenas extraia do que foi fornecido;
            não formate com /n ou outros caracteres especiais;
            selecione 3 apenas;
            apenas retorne palavras-chave, sem explicações ou palavras de preenchimento como oque é, quais são, me explique, aqui estão etc
            `,
            // Retorne apenas uma frase otimizada para mecanismo de busca.`,
            user: question
          })
        }
        
export async function questionValidator(question,context) {

  return askLLM({
    system: ` Com base APENAS no contexto abaixo,
              é possível responder a pergunta?
              Responda apenas:
              false
              ou
              true
            `,
            user: question,
            context:context
          })
        }
        