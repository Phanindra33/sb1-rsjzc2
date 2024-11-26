import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface SuggestedTopicsProps {
  topics: string[];
  onSelectTopic: (topic: string) => void;
}

export default function SuggestedTopics({ topics, onSelectTopic }: SuggestedTopicsProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-gray-400">
        <Sparkles className="w-4 h-4" />
        <span className="text-sm">Suggested topics:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelectTopic(topic)}
            className="px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-full transition-colors"
          >
            {topic}
          </motion.button>
        ))}
      </div>
    </div>
  );
}