import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TerminalLine } from '../types';
import { playSound } from '../utils/soundUtils';
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
    playSound('CLICK');

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
    <div className="h-full w-full bg-[#1c1c1c] text-[#d3d7cf] terminal-text px-6 py-4 sm:px-8 selection:bg-[#3b82f6]/30 overflow-hidden flex flex-col relative">
      <div 
        ref={scrollRef}
        className="w-full flex-1 overflow-y-auto scrollbar-hide space-y-2 pb-4"
      >
        <AnimatePresence mode="popLayout">
          {history.map((line) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1 }}
              className="w-full whitespace-pre-wrap break-words leading-relaxed text-[10px] sm:text-xs text-left overflow-hidden"
            >
              <div className="flex items-start gap-1.5 sm:gap-2">
                {line.type === 'command' && (
                  <div className="flex items-center select-none shrink-0 opacity-90 whitespace-nowrap pt-0.5">
                    <span className="text-[#3b82f6] font-bold">
                      <span className="hidden xs:inline">bl4ck30x@kali</span>
                      <span className="xs:hidden">w1hi4</span>
                    </span>
                    <span className="text-white">:</span>
                    <span className="text-[#3b82f6] font-bold">~</span>
                    <span className="text-white">$</span>
                  </div>
                )}
                <div className="flex-1 min-w-0 pt-0.5">
                  {typeof line.content === 'string' ? (
                    <span 
                      className={
                        line.type === 'error' ? 'text-red-500' : 
                        line.type === 'system' ? 'text-white/40 italic opacity-80' : 
                        line.type === 'command' ? 'text-[#00ff00]' : ''
                      }
                      dangerouslySetInnerHTML={{ __html: line.content }}
                    />
                  ) : (
                    line.content
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <CommandInput onCommand={handleCommand} history={commandHistory} />
      </div>

      {/* Mobile Quick Commands */}
      <div className="sm:hidden flex flex-wrap gap-2 pt-4 border-t border-white/5 bg-[#1c1c1c] pb-2 overflow-x-auto scrollbar-hide">
        {['help', 'whoami', 'projects', 'skills', 'clear', 'about'].map(cmd => (
          <button 
            key={cmd}
            onClick={() => {
              playSound('CLICK');
              handleCommand(cmd);
            }}
            className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-[10px] uppercase tracking-widest font-bold hover:bg-blue-500/20 hover:border-blue-500/50 transition-all active:scale-95 whitespace-nowrap"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Terminal;
