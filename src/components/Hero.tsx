import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Sparkles } from 'lucide-react';
import RobotScene from './RobotScene';

export default function Hero() {
  const handleGetStarted = () => {
    // Dispatch a custom event that ChatBot component will listen to
    window.dispatchEvent(new CustomEvent('openChatBot'));
  };

  const handleLearnMore = () => {
    window.open('https://www.dsce.edu.in', '_blank');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black to-indigo-950 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-cover bg-center opacity-10" />
      
      <div className="container mx-auto px-4 pt-20 pb-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
              State of the Art AI Chatbot
            </h1>
            <p className="text-xl text-gray-300">
              Revolutionizing Departmental Support with 24/7 Efficiency and Instant Answers.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                onClick={handleGetStarted}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full text-white font-semibold 
                  shadow-[0_0_30px_-5px] shadow-blue-500/50
                  hover:shadow-[0_0_80px_5px] hover:shadow-violet-500/70
                  active:shadow-[0_0_100px_10px] active:shadow-blue-500/80
                  before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent 
                  before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700
                  after:absolute after:inset-0 after:rounded-full after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent 
                  after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-1000 after:delay-100
                  overflow-hidden transition-all duration-300"
              >
                <span className="relative z-10 group-hover:animate-pulse">Get Started</span>
              </motion.button>
              <motion.button
                onClick={handleLearnMore}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 border border-white/20 rounded-full text-white font-semibold
                  hover:border-violet-500/50
                  shadow-[0_0_30px_-5px] shadow-transparent
                  hover:shadow-[0_0_80px_5px] hover:shadow-violet-500/30
                  before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-violet-500/20 before:to-blue-500/20 
                  before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                  after:absolute after:inset-0 after:rounded-full after:bg-gradient-to-r after:from-violet-500/10 after:to-blue-500/10 
                  after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500 after:delay-100
                  overflow-hidden transition-all duration-300"
              >
                <span className="relative z-10 group-hover:animate-pulse">Learn More</span>
              </motion.button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="h-[600px]"
          >
            <RobotScene />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-32" />
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-xl"
      >
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Feature
              icon={<Brain className="w-8 h-8 text-blue-400" />}
              title="Advanced AI"
              description="State-of-the-art machine learning models"
            />
            <Feature
              icon={<Cpu className="w-8 h-8 text-violet-400" />}
              title="Neural Processing"
              description="High-performance computing solutions"
            />
            <Feature
              icon={<Sparkles className="w-8 h-8 text-indigo-400" />}
              title="Smart Automation"
              description="Intelligent process optimization"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Feature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-center space-x-4 text-white">
      {icon}
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
}