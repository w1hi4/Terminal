import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const KNOWLEDGE_BASE = [
  {
    category: 'who',
    keywords: ['who', 'wahiduddin', 'samani', 'bl4ck30x', 'creator', 'owner', 'about admin', 'developer'],
    response: "Wahiduddin Samani (bl4ck30x) is the Lead Developer and Security Researcher who engineered this entire OS. He specializes in bridging the gap between high-end frontend engineering and deep cybersecurity."
  },
  {
    category: 'skills',
    keywords: ['skills', 'tech', 'stack', 'languages', 'know', 'expert', 'coding', 'experience'],
    response: "My creator is a master of the modern web: React, TypeScript, Node.js, and Python. On the security side, he's expert in Kali Linux, Penetration Testing, and DevSecOps. He builds secure, high-performance systems."
  },
  {
    category: 'projects',
    keywords: ['project', 'work', 'build', 'terminal', 'game', 'crypto', 'portfolio', 'browser'],
    response: "This OS is his primary showcase! It features a Linux-style Terminal, a Real-time Crypto Tracker, a futuristic CyberRunner game, and a sandbox Browser. Everything was hand-coded by him from the ground up."
  },
  {
    category: 'hire',
    keywords: ['hire', 'contact', 'job', 'work with him', 'resume', 'email'],
    response: "Wahiduddin is currently open to high-impact roles in DevSecOps and Lead Development. His unique blend of security and frontend mastery makes him a rare asset. You can find his contact details in the 'Portfolio' app."
  },
  {
    category: 'os',
    keywords: ['this os', 'what is this', 'website', 'kali', 'linux terminal'],
    response: "You are inside 'bl4ck30x OS'—a living portfolio. It's a high-fidelity web simulation built with React and Tailwind CSS to prove that technical power and aesthetic design can coexist."
  },
  {
    category: 'greetings',
    keywords: ['hi ', 'hello', 'hey', 'greetings', 'sup', 'yo'],
    response: "Greetings, user. Neural link established. I am the bl4ck30x AI. Ask me about Wahiduddin's 'Skills', 'Projects' or 'Who' he is!"
  }
];

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "System initialized. bl4ck30x Intelligence at your service. Ask me about Wahiduddin's skills or projects.",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getLocalResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase().trim();
    
    // Exact word matching to prevent "hi" matching inside "waHIduddin"
    const words = lowerQuery.split(/\s+/);
    
    // Priority 1: Check for category keywords first
    for (const entry of KNOWLEDGE_BASE) {
      if (entry.category === 'greetings') continue; // Skip greetings for first pass
      
      const matched = entry.keywords.some(keyword => {
        // If keyword is one word, check exact word match
        if (!keyword.includes(' ')) {
          return words.includes(keyword);
        }
        // If keyword is a phrase, check if it exists in query
        return lowerQuery.includes(keyword);
      });

      if (matched) return entry.response;
    }

    // Priority 2: Check for name/creator specifically (misspellings)
    if (lowerQuery.includes('wahid') || lowerQuery.includes('samani') || lowerQuery.includes('blackbox') || lowerQuery.includes('creator')) {
      return KNOWLEDGE_BASE.find(e => e.category === 'who')?.response || "";
    }
    
    // Priority 3: Greetings
    const greetingMatch = KNOWLEDGE_BASE.find(e => e.category === 'greetings')?.keywords.some(k => {
      const cleanK = k.trim();
      return words.includes(cleanK) || lowerQuery.startsWith(cleanK);
    });
    
    if (greetingMatch) {
      return KNOWLEDGE_BASE.find(e => e.category === 'greetings')?.response || "";
    }
    
    return "Scanning database... I didn't find a direct match for that. Try asking specific terms like 'What are your skills?' or 'Show me projects'.";
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate "Thinking" time for realism
    setTimeout(() => {
      const aiText = getLocalResponse(input);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiText,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="flex flex-col h-full bg-transparent text-white font-mono selection:bg-blue-500/30">
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scroll-smooth">
        {messages.map((m) => (
          <motion.div 
            key={m.id} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] p-4 rounded-2xl flex gap-3 transition-all ${
              m.sender === 'user' 
                ? 'bg-blue-600/10 border border-blue-500/30 shadow-[0_0_20px_rgba(37,99,235,0.1)]' 
                : 'bg-white/[0.03] border border-white/10 backdrop-blur-sm'
            }`}>
              <div className="shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  m.sender === 'user' ? 'bg-blue-900/40' : 'bg-white/5'
                }`}>
                  {m.sender === 'user' ? (
                    <User className="w-4 h-4 text-blue-400" />
                  ) : (
                    <Bot className="w-4 h-4 text-blue-400" />
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-bold opacity-30 uppercase tracking-widest">
                  {m.sender === 'user' ? 'Root' : 'System'}
                </div>
                <p className="text-sm leading-relaxed text-white/90 whitespace-pre-wrap">{m.text}</p>
                <div className="text-[9px] opacity-20 text-right mt-1 font-sans">
                  {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white/[0.03] border border-white/10 p-4 rounded-2xl flex items-center gap-3">
              <Bot className="w-4 h-4 text-blue-400 animate-spin [animation-duration:3s]" />
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                    className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-black/60 border-t border-white/5">
        <div className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your command..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-white/20"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:hover:bg-blue-600 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-2 text-[8px] text-center text-white/20 uppercase tracking-[0.3em]">
          End-to-End Cryptography Enabled
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
