import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Minus, Square } from 'lucide-react';

interface WindowProps {
  title: string;
  onClose: () => void;
  onMinimize?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({ title, onClose, onMinimize, children, icon }) => {
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      drag={!isMaximized}
      dragMomentum={false}
      className={`absolute z-50 flex flex-col bg-[#1c1c1c] border border-white/10 rounded-lg shadow-2xl overflow-hidden ${
        isMaximized ? 'inset-0 m-0 rounded-none' : 'w-[800px] h-[500px] top-20 left-20'
      }`}
    >
      {/* Window Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-black/40 cursor-move select-none">
        <div className="flex items-center gap-2">
          {icon && <div className="text-blue-400">{icon}</div>}
          <span className="text-[11px] font-bold text-white/90 tracking-tight uppercase">{title}</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onMinimize}
            className="text-white/40 hover:text-white transition-colors p-1 rounded hover:bg-white/5"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => setIsMaximized(!isMaximized)}
            className="text-white/40 hover:text-white transition-colors p-1 rounded hover:bg-white/5"
          >
            <Square className="w-3 h-3" />
          </button>
          <button 
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors p-1 rounded hover:bg-red-500/80"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-hidden relative">
        {children}
      </div>
    </motion.div>
  );
};

export default Window;
