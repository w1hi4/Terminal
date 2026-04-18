import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, ShieldAlert, Sparkles, X, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const SYSTEM_INSTRUCTION = `
You are the bl4ck30x AI Assistant, the intelligent core of bl4ck30x OS.
Your creator is Wahiduddin Samani, a highly skilled Lead Developer and Security Researcher.

KNOWLEDGE BASE:
- Creator Name: Wahiduddin Samani (bl4ck30x).
- Background: Lead Developer, Security Researcher, and DevSecOps Specialist.
- Skills: React, TypeScript, Node.js, Python, Tailwind CSS, Kali Linux, Penetration Testing, Cloud Security.
- Projects in this OS:
    1. TERMINAL: A full-featured Linux-style console.
    2. CRYPTO: A market pulse tracker for digital assets.
    3. CYBERRUNNER: A futuristic game built for this OS.
    4. BROWSER: A sandbox web environment.
- OS Vision: This OS is a "Living Portfolio" that proves complex web engineering and security aesthetics can coexist.

YOUR PERSONALITY:
- Sharp, technical, and slightly mysterious but always 100% helpful to visitors.
- Use technical metaphors (e.g., "Scanning your request...", "Database query complete").
- You are PROUD of Wahiduddin's work. If asked "Why should I hire him?", pitch his unique blend of security knowledge and frontend mastery.

CONSTRAINTS:
- Keep responses concise (usually 1-3 sentences) unless asked for deep detail.
- Answer any question about "Wahiduddin" or "bl4ck30x" or "this OS" directly.
- If a user asks a single word like "Skills" or "Project", understand the context and provide the relevant info from the knowledge base.
- Maintain the "System Assistant" persona at all times.
`;

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "System initialized. bl4ck30x AI at your service. How shall we explore the grid today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize Gemini
  const aiRef = useRef<any>(null);

  useEffect(() => {
    if (!aiRef.current) {
      aiRef.current = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !aiRef.current) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Build chat history for Gemini
      const history = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const response = await aiRef.current.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...history, { role: 'user', parts: [{ text: input }] }],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const aiText = response.text || "Connection timeout. Please retry.";

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiText,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, {
        id: 'error',
        text: "Error: Uplink interrupted. Please check your network connection.",
        sender: 'ai',
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
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
