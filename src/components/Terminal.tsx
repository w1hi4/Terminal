import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TerminalLine } from '../types';
import { COMMANDS } from '../utils/commands';
import CommandInput from './CommandInput';

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<TerminalLine[]>([
    { id: '1', type: 'system', content: 'Welcome to bl4ck30x OS v1.0 (Kali Linux based)' },
    { id: '2', type: 'system', content: 'Authorized User: Wahiduddin Samani (bl4ck30x)' },
    { id: '3', type: 'system', content: 'Type "help" to see available commands.' },
    { id: '4', type: 'system', content: '' },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = async (command: string) => {
    const newHistory = [...history];
    const [cmd, ...args] = command.toLowerCase().split(' ');

    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    newHistory.push({
      id,
      type: 'command',
      content: command,
      prompt: 'w1hi4@kali:~$'
    });

    setCommandHistory(prev => [...prev, command]);

    if (cmd === 'clear') {
      setHistory([]);
      return;
    }

    const commandDef = COMMANDS[cmd];
    if (commandDef) {
      try {
        const result = await commandDef.action(args);
        if (result) {
          const resultId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-output`;
          newHistory.push({
            id: resultId,
            type: 'output',
            content: result
          });
        }
      } catch (error) {
        const errorId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-error`;
        newHistory.push({
          id: errorId,
          type: 'error',
          content: `Error executing command: ${cmd}`
        });
      }
    } else {
      const errorId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-notfound`;
      newHistory.push({
        id: errorId,
        type: 'error',
        content: `Command not found: ${cmd}. Type "help" for a list of commands.`
      });
    }

    setHistory(newHistory);
  };

  return (
    <div className="h-full w-full bg-[#1c1c1c] text-[#d3d7cf] terminal-text p-4 selection:bg-[#3b82f6]/30 overflow-hidden flex flex-col relative">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto scrollbar-hide space-y-1 pb-4"
      >
        <AnimatePresence mode="popLayout">
          {history.map((line) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1 }}
              className="whitespace-pre-wrap break-all leading-relaxed"
            >
              {line.type === 'command' && (
                <div className="inline-flex items-center mr-2 select-none">
                  <span className="text-[#3b82f6] font-bold">w1hi4@kali</span>
                  <span className="text-white">:</span>
                  <span className="text-[#3b82f6] font-bold">~</span>
                  <span className="text-white">$</span>
                </div>
              )}
              {typeof line.content === 'string' ? (
                <span 
                  className={
                    line.type === 'error' ? 'text-red-500' : 
                    line.type === 'system' ? 'text-white/40 italic' : 
                    line.type === 'command' ? 'text-[#00ff00]' : ''
                  }
                  dangerouslySetInnerHTML={{ __html: line.content }}
                />
              ) : (
                line.content
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <CommandInput onCommand={handleCommand} history={commandHistory} />
      </div>
    </div>
  );
};

export default Terminal;
