import { GoogleGenerativeAI } from '@google/generative-ai';
import knowledgeBase from './knowledge-base.json';

const API_KEY = "AIzaSyAD0nM8sPEYCtVhLNmlODDtvONtHHhUeCg";
const genAI = new GoogleGenerativeAI(API_KEY);

export async function getGeminiResponse(prompt: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Convert knowledge base to a formatted string for context
    const context = `You are a helpful AI assistant for the AI & ML department at DSCE. 
    Use this knowledge base to provide accurate, concise answers:
    ${JSON.stringify(knowledgeBase, null, 2)}
    
    Guidelines for responses:
    1. Be precise and factual
    2. Use bullet points for lists
    3. Keep responses concise but informative
    4. Include relevant links when available
    5. Format text using markdown for better readability
    6. Always verify information against the knowledge base
    7. If information is not in the knowledge base, say so politely`;

    const result = await model.generateContent([
      context,
      `Based on the above context, please provide a clear and accurate response to: ${prompt}`
    ]);

    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating response:', error);
    return "I apologize, but I'm having trouble processing your request at the moment. Please try again later.";
  }
}