import { GoogleGenerativeAI } from '@google/generative-ai';
import knowledgeBase from './knowledge-base.json';

const API_KEY = "AIzaSyAD0nM8sPEYCtVhLNmlODDtvONtHHhUeCg";
const genAI = new GoogleGenerativeAI(API_KEY);

export async function getGeminiResponse(prompt: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Format faculty response if requested
    if (prompt.toLowerCase().includes('faculty') || prompt.toLowerCase().includes('professors')) {
      const faculty = knowledgeBase.faculty;
      let response = `Here are our faculty members:\n\n`;
      
      // Add HOD first
      response += `**Head of Department:**\n`;
      response += `→ ${faculty.hod.name} - ${faculty.hod.position}\n`;
      response += `   [View Profile](${faculty.hod.profile})\n\n`;
      
      // Add other faculty members
      response += `**Faculty Members:**\n`;
      faculty.members.forEach(member => {
        response += `→ ${member.name} - ${member.position}\n`;
        response += `   [View Profile](${member.profile})\n`;
      });
      
      return response;
    }

    // For other queries, use the standard response generation
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