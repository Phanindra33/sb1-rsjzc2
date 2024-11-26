import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, ArrowRight } from 'lucide-react';
import { getGeminiResponse } from '../lib/gemini';
import ChatMessage from './ChatMessage';
import SuggestedTopics from './SuggestedTopics';

interface Message {
  text: string;
  isBot: boolean;
}

const suggestedTopics = [
  "What is the department's vision and mission?",
  "Tell me about the curriculum and courses",
  "What are the admission requirements?",
  "Who are the faculty members?",
  "What research facilities are available?",
  "Tell me about industry collaborations",
  "What are the career opportunities?",
  "What programming languages do we learn?",
  "Tell me about placement support",
  "What student activities are available?"
];

const INITIAL_BOT_MESSAGE = {
  text: "Hello! I'm your AI & ML Department Assistant. How can I help you today?",
  isBot: true
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_BOT_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOpenChatBot = () => setIsOpen(true);
    window.addEventListener('openChatBot', handleOpenChatBot);
    return () => window.removeEventListener('openChatBot', handleOpenChatBot);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages, isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    // Reset chat state after closing animation completes
    setTimeout(() => {
      setMessages([INITIAL_BOT_MESSAGE]);
      setInput('');
      setIsLoading(false);
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setIsLoading(true);

    try {
      const botResponse = await getGeminiResponse(userMessage);
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        text: "I apologize, but I'm having trouble processing your request. Please try again.",
        isBot: true
      }]);
    } finally {
      setIsLoading(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleTopicSelect = (topic: string) => {
    setInput(topic);
    const event = new Event('submit') as any;
    handleSubmit(event);
  };

  const handleLearnMore = () => {
    window.open('https://www.dsce.edu.in', '_blank');
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-24 right-4 bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-3 rounded-lg shadow-lg z-50
          group cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <motion.div
          className="absolute -right-2 -top-2"
          animate={{ 
            x: [0, 10, 0],
            rotate: [0, 15, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <ArrowRight className="w-6 h-6 text-white" />
        </motion.div>
        <p className="text-white font-semibold group-hover:scale-105 transition-transform">
          Hi there! Please Get Started
        </p>
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-lg"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        />
      </motion.div>

      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full p-4 
          shadow-[0_0_30px_-5px] shadow-blue-500/50
          hover:shadow-[0_0_80px_5px] hover:shadow-violet-500/70 
          active:shadow-[0_0_100px_10px] active:shadow-blue-500/80
          before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent 
          before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700 before:ease-in-out
          after:absolute after:inset-0 after:rounded-full after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent 
          after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-1000 after:delay-100
          overflow-hidden transition-all duration-500 z-50 group
          hover:scale-125 hover:-translate-y-1
          active:scale-90 active:translate-y-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <MessageCircle className="w-6 h-6 text-white relative z-10 group-hover:animate-[pulse_0.6s_ease-in-out_infinite]" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-4 w-96 h-[600px] bg-gradient-to-b from-gray-900 to-black rounded-2xl 
              shadow-[0_0_50px_-10px] shadow-blue-500/50
              hover:shadow-[0_0_80px_-10px] hover:shadow-violet-500/60
              border border-gray-800/50 backdrop-blur-xl z-50"
          >
            <div className="p-4 bg-gradient-to-r from-blue-500 to-violet-500 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6 text-white" />
                <span className="font-semibold text-white">AI Assistant</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={handleLearnMore}
                  className="text-white hover:bg-white/20 px-3 py-1 rounded-full text-sm transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
                <motion.button
                  onClick={handleClose}
                  className="text-white hover:bg-white/20 p-2 rounded-full transition-all"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            <div className="h-[480px] overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              {messages.map((message, index) => (
                <ChatMessage key={index} {...message} />
              ))}
              
              {isLoading && (
                <ChatMessage
                  text="Thinking..."
                  isBot={true}
                  isTyping={true}
                />
              )}

              {messages.length === 1 && (
                <SuggestedTopics 
                  topics={suggestedTopics} 
                  onSelectTopic={handleTopicSelect} 
                />
              )}
              
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="absolute bottom-0 left-0 right-0 p-4 bg-gray-900/80 backdrop-blur-sm rounded-b-2xl border-t border-gray-800/50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-full px-4 py-2 text-white 
                    focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
                    placeholder-gray-400 transition-all duration-300"
                  disabled={isLoading}
                  ref={inputRef}
                />
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-500 to-violet-500 p-2 rounded-full disabled:opacity-50 
                    shadow-lg hover:shadow-xl hover:shadow-blue-500/30
                    before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent 
                    before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700
                    overflow-hidden relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-5 h-5 text-white relative z-10 group-hover:animate-pulse" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}