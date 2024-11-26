import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  text: string;
  isBot: boolean;
  isTyping?: boolean;
}

export default function ChatMessage({ text, isBot, isTyping }: ChatMessageProps) {
  const getEmoji = (text: string): string => {
    if (isTyping) return '🤔';
    if (text.toLowerCase().includes('hello') || text.toLowerCase().includes('hi')) return '👋';
    if (text.toLowerCase().includes('thank')) return '🙏';
    if (text.toLowerCase().includes('sorry') || text.toLowerCase().includes('apologize')) return '😅';
    if (text.toLowerCase().includes('great') || text.toLowerCase().includes('awesome')) return '🎉';
    if (text.toLowerCase().includes('learn') || text.toLowerCase().includes('study')) return '📚';
    if (text.toLowerCase().includes('career') || text.toLowerCase().includes('job')) return '💼';
    return isBot ? '🤖' : '👤';
  };

  const formatResponse = (text: string) => {
    // Format lists
    text = text.replace(/•/g, '→');
    
    // Add spacing after periods for better readability
    text = text.replace(/\./g, '. ');
    
    // Format key-value pairs
    text = text.replace(/(\w+):/g, '**$1:**');
    
    return text;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} gap-2`}
    >
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center flex-shrink-0">
          <span className="text-lg">{getEmoji(text)}</span>
        </div>
      )}
      <div
        className={`max-w-[80%] p-4 rounded-2xl ${
          isBot
            ? 'bg-gray-800/80 backdrop-blur-sm text-white'
            : 'bg-gradient-to-r from-blue-500 to-violet-500 text-white'
        }`}
      >
        <ReactMarkdown
          className={`prose ${isBot ? 'prose-invert' : ''} max-w-none
            prose-headings:mb-2 prose-headings:mt-1 
            prose-p:mb-2 prose-p:leading-relaxed
            prose-li:mb-1 
            prose-strong:text-blue-300
            prose-code:text-violet-300 prose-code:bg-black/20 prose-code:px-1 prose-code:rounded
            prose-ul:list-none prose-ul:pl-4 prose-ul:space-y-1
            prose-ol:pl-4 prose-ol:space-y-1
            [&>*:first-child]:mt-0 [&>*:last-child]:mb-0`}
        >
          {formatResponse(text)}
        </ReactMarkdown>
      </div>
      {!isBot && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 flex items-center justify-center flex-shrink-0">
          <span className="text-lg">{getEmoji(text)}</span>
        </div>
      )}
    </motion.div>
  );
}