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
    category: 'identity',
    id: 'ai_core',
    label: 'AI System',
    keywords: ['what are you', 'who are you', 'your name', 'purpose', 'assistant', 'bot', 'ai', 'about you', 'system'],
    response: "I am the bl4ck30x Intelligence System, a localized neural core engineered by Wahiduddin Samani. My purpose is to provide data regarding his professional expertise, projects, and the architecture of this OS simulation."
  },
  {
    category: 'creator',
    id: 'who_is',
    label: 'About Admin',
    keywords: ['who is wahiduddin', 'creator', 'owner', 'samani', 'blackbox', 'bl4ck30x', 'who made this', 'author', 'developer', 'wahid', 'admin'],
    response: "Wahiduddin Samani (bl4ck30x) is an elite Lead Developer and Security Researcher. He specializes in bridging complex frontend engineering with deep-level cybersecurity and DevSecOps. He is the sole architect of this digital environment."
  },
  {
    category: 'stack',
    id: 'skills',
    label: 'Skills Dossier',
    keywords: ['skills', 'stack', 'languages', 'tech', 'expert', 'coding', 'experience', 'programming', 'javascript', 'typescript', 'react', 'python', 'node', 'what skills'],
    response: "Technical Dossier for Wahiduddin Samani:\n• Frontend: Master of React & TypeScript with high-fidelity UI/UX design.\n• Backend: Scalable Node.js, Python, and efficient API architecture.\n• Security: Expert in Kali Linux, Penetration Testing, and OWASP standards.\n• Operations: Advanced DevSecOps workflows and Cloud Security."
  },
  {
    category: 'projects',
    id: 'projects',
    label: 'View Projects',
    keywords: ['projects', 'portfolio', 'work', 'build', 'apps', 'terminal', 'game', 'cyberrunner', 'crypto', 'tracker', 'browser', 'show projects'],
    response: "Active Systems in this OS Portfolio:\n1. LINUX TERMINAL: A functional console for system interaction.\n2. CRYPTO PULSE: Real-time digital asset monitoring.\n3. CYBERRUNNER: A futuristic high-performance game logic showcase.\n4. SANDBOX BROWSER: A secure web simulation environment.\nAll modules were engineered from the ground up by Wahiduddin."
  },
  {
    category: 'career',
    id: 'career',
    label: 'Career Status',
    keywords: ['hire', 'contact', 'job', 'work with', 'availability', 'resume', 'cv', 'email', 'opportunity', 'career', 'status', 'career status'],
    response: "Wahiduddin is currently scanning for high-impact opportunities in Lead Development or DevSecOps. His unique cross-discipline expertise is a critical asset for teams requiring both performance and security. Contact protocols are available via the 'Portfolio' icon on the desktop."
  },
  {
    category: 'architecture',
    id: 'architecture',
    label: 'Architecture',
    keywords: ['how was this made', 'website built', 'react', 'tailwind', 'code', 'source', 'framework', 'system architecture', 'architecture'],
    response: "This OS simulation is built using a modern React 19 + TypeScript stack, styled with Tailwind CSS v4, and powered by Motion for high-fidelity animations. It utilizes a custom window management system to simulate a desktop environment."
  },
  {
    category: 'greetings',
    id: 'hello',
    label: 'Greetings',
    keywords: ['hi', 'hello', 'hey', 'greetings', 'sup', 'yo', 'good morning', 'good evening'],
    response: "Neural link established. System status: Nominal. I am the bl4ck30x AI. Specify a data request: 'Skills', 'Projects', or 'Creator Info'."
  }
];

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Neural link established. bl4ck30x Intelligence online. Please select a command category or type your query below.",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
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
    if (!lowerQuery) return "Please enter a valid command.";
    
    // Exact suggested label match (highest priority)
    const exactLabelMatch = KNOWLEDGE_BASE.find(e => e.label.toLowerCase() === lowerQuery);
    if (exactLabelMatch) return exactLabelMatch.response;

    // Normal keyword matching
    const words = lowerQuery.split(/[\s,?.!]+/).filter(w => w.length > 0);
    const priorityOrder = ['career', 'stack', 'projects', 'creator', 'identity', 'architecture', 'greetings'];
    
    for (const cat of priorityOrder) {
      const entry = KNOWLEDGE_BASE.find(e => e.category === cat);
      if (!entry) continue;

      const matched = entry.keywords.some(k => {
        if (k.includes(' ')) {
          return lowerQuery.includes(k);
        }
        return words.includes(k);
      });

      if (matched) return entry.response;
    }

    return "Query unmatched. Please use the command chips above or ask about 'Skills', 'Projects', or 'Career Status'.";
  };

  const processInput = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const aiText = getLocalResponse(text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiText,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 600);
  };

  const handleSuggestionClick = (label: string) => {
    if (isTyping) return;
    processInput(label);
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

      <div className="p-4 bg-black/60 border-t border-white/5 space-y-4">
        <div className="text-[9px] text-white/40 uppercase tracking-widest font-bold mb-2">
          Select Command Protocol:
        </div>
        {/* Suggestion Chips */}
        <div className="flex flex-wrap gap-2">
          {KNOWLEDGE_BASE.filter(k => k.category !== 'greetings').map((entry) => (
            <button
              key={entry.id}
              onClick={() => handleSuggestionClick(entry.label)}
              disabled={isTyping}
              className="flex-1 min-w-[140px] px-3 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] text-white/70 hover:text-blue-400 hover:bg-blue-400/10 hover:border-blue-500/30 transition-all uppercase tracking-wider font-bold text-center disabled:opacity-30"
            >
              {entry.label}
            </button>
          ))}
        </div>

        <div className="mt-2 text-[8px] text-center text-white/20 uppercase tracking-[0.3em]">
          End-to-End Cryptography Enabled
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
