import { NextApiRequest, NextApiResponse } from 'next';
import { loadKnowledgeBase } from '../../lib/knowledge-base';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const knowledgeBase = await loadKnowledgeBase();
    res.status(200).json(knowledgeBase);
  } catch (error) {
    console.error('Error loading knowledge base:', error);
    res.status(500).json({ message: 'Error loading knowledge base' });
  }
}