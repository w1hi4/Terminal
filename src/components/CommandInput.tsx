import React, { useState, useEffect, useRef } from 'react';
import { COMMANDS } from '../utils/commands';

interface CommandInputProps {
  onCommand: (command: string) => void;
  history: string[];
}

const CommandInput: React.FC<CommandInputProps> = ({ onCommand, history }) => {
  const [value, setValue] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const focusInput = () => inputRef.current?.focus();
    window.addEventListener('click', focusInput);
    return () => window.removeEventListener('click', focusInput);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const command = value.trim();
      if (command) {
        onCommand(command);
        setValue('');
        setHistoryIndex(-1);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const commands = Object.keys(COMMANDS);
      const matches = commands.filter(cmd => cmd.startsWith(value.toLowerCase()));
      if (matches.length === 1) {
        setValue(matches[0]);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = Math.min(historyIndex + 1, history.length - 1);
        setHistoryIndex(nextIndex);
        setValue(history[history.length - 1 - nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setValue(history[history.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setValue('');
      }
    }
  };

  return (
    <div className="flex items-center gap-2 font-mono">
      <div className="flex items-center select-none">
        <span className="text-[#3b82f6] font-bold">bl4ck30x@kali</span>
        <span className="text-white">:</span>
        <span className="text-[#3b82f6] font-bold">~</span>
        <span className="text-white">$</span>
      </div>
      <input
        ref={inputRef}
        type="text"
        autoFocus
        className="flex-1 bg-transparent border-none outline-none text-[#00ff00] caret-[#00ff00] selection:bg-[#00ff00]/30"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        autoComplete="off"
      />
    </div>
  );
};

export default CommandInput;
