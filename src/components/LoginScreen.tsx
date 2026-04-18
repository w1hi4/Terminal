import React, { useState } from 'react';
import { User, Lock, ArrowRight, Power, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginScreenProps {
  onLogin: () => void;
  onPowerOff: () => void;
  onRestart: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onPowerOff, onRestart }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === 'kali' || password.toLowerCase() === 'w1hi4') {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-cover bg-center z-[900]"
      style={{ 
        backgroundImage: 'url("https://images.wallpapersden.com/image/download/kali-linux-dragon-logo_bGZma2aUmZqaraWkpJRmbmdlrWZlbWU.jpg")',
        backgroundColor: '#0a0a0a'
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`relative w-[380px] p-10 bg-[#1a1a1a]/40 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] shadow-2xl text-center ${error ? 'animate-shake' : ''}`}
      >
        <div className="mb-8 flex justify-center">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative"
          >
            <div className="w-28 h-28 rounded-full border-2 border-blue-500/30 p-1">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#161b22] border border-white/10 shadow-2xl">
                <img 
                  src="https://github.com/w1hi4.png" 
                  alt="w1hi4" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-green-500 border-4 border-[#1a1a1a] shadow-lg" />
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">Wahiduddin Samani</h1>
          <p className="text-[10px] text-blue-400/60 mb-10 uppercase tracking-[0.4em] font-bold">bl4ck30x</p>
        </motion.div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-blue-400 transition-colors" />
            <input 
              type="password"
              autoFocus
              placeholder="Enter Password"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-12 text-white text-sm outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder:text-white/10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 transition-all"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] text-red-500 uppercase tracking-widest font-bold"
            >
              Access Denied. Try 'kali'
            </motion.p>
          )}
        </form>
        
        <div className="mt-12 pt-8 border-t border-white/5 flex justify-center gap-8 text-white/20">
          <button 
            onClick={onPowerOff} 
            className="flex flex-col items-center gap-2 group transition-all"
          >
            <div className="p-2 rounded-lg group-hover:bg-red-500/10 group-hover:text-red-500 transition-all">
              <Power className="w-4 h-4" />
            </div>
            <span className="text-[9px] uppercase tracking-widest group-hover:text-white/40">Power</span>
          </button>
          <button 
            onClick={onRestart} 
            className="flex flex-col items-center gap-2 group transition-all"
          >
            <div className="p-2 rounded-lg group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-all">
              <RotateCcw className="w-4 h-4" />
            </div>
            <span className="text-[9px] uppercase tracking-widest group-hover:text-white/40">Restart</span>
          </button>
        </div>
      </motion.div>

      {/* Footer Info */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/10 text-[10px] uppercase tracking-[0.5em] font-bold">
        w1hi4 OS Security Layer v1.0
      </div>
    </div>
  );
};

export default LoginScreen;
