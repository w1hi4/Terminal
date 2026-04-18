import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { 
  Terminal as TerminalIcon, 
  Folder, 
  Trash2, 
  Globe, 
  Cpu, 
  Wifi, 
  Volume2, 
  Battery, 
  Search,
  X,
  LayoutGrid,
  Monitor,
  Gamepad2,
  User,
  FileText,
  Github,
  RotateCcw,
  Power,
  Activity,
  TrendingUp,
  Sun,
  ShieldAlert,
  Bot
} from 'lucide-react';
import Terminal from './components/Terminal';
import Window from './components/Window';
import Browser from './components/Browser';
import SnakeGame from './components/SnakeGame';
import Minesweeper from './components/Minesweeper';
import PortfolioText from './components/PortfolioText';
import BootScreen from './components/BootScreen';
import LoginScreen from './components/LoginScreen';
import CyberRunner from './components/CyberRunner';
import SystemMonitor from './components/SystemMonitor';
import Weather from './components/Weather';
import CryptoTracker from './components/CryptoTracker';
import AIAssistant from './components/AIAssistant';

const DesktopIcon = ({ icon: Icon, label, onClick, color = "text-white/80" }: any) => (
  <button 
    onDoubleClick={onClick}
    className="flex flex-col items-center gap-1 p-2 rounded hover:bg-white/10 transition-colors group w-24 select-none"
  >
    <div className={`p-3 rounded-lg bg-black/20 backdrop-blur-sm border border-white/5 group-hover:border-white/20 transition-all ${color}`}>
      <Icon className="w-8 h-8" />
    </div>
    <span className="text-[10px] font-medium text-white shadow-sm text-center leading-tight">{label}</span>
  </button>
);

function App() {
  const [isPoweredOff, setIsPoweredOff] = useState(false);
  const [booting, setBooting] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isBrowserOpen, setIsBrowserOpen] = useState(false);
  const [isSnakeOpen, setIsSnakeOpen] = useState(false);
  const [isMinesweeperOpen, setIsMinesweeperOpen] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [isCyberRunnerOpen, setIsCyberRunnerOpen] = useState(false);
  const [isSystemMonitorOpen, setIsSystemMonitorOpen] = useState(false);
  const [isWeatherOpen, setIsWeatherOpen] = useState(false);
  const [isCryptoOpen, setIsCryptoOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [minimizedWindows, setMinimizedWindows] = useState<Set<string>>(new Set());
  const [time, setTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const handleOnComplete = React.useCallback(() => {
    setBooting(false);
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleRestart = () => {
    setBooting(true);
    setIsLoggedIn(false);
    setIsTerminalOpen(false);
    setIsBrowserOpen(false);
    setIsSnakeOpen(false);
    setIsMinesweeperOpen(false);
    setIsPortfolioOpen(false);
    setIsCyberRunnerOpen(false);
    setIsSystemMonitorOpen(false);
    setIsWeatherOpen(false);
    setIsCryptoOpen(false);
    setIsAIAssistantOpen(false);
    setMinimizedWindows(new Set());
  };

  const handlePowerOff = () => {
    setIsPoweredOff(true);
    setIsLoggedIn(false);
    setBooting(true);
  };

  const toggleMinimize = (windowId: string) => {
    setMinimizedWindows(prev => {
      const next = new Set(prev);
      if (next.has(windowId)) next.delete(windowId);
      else next.add(windowId);
      return next;
    });
  };

  const openWindow = (openFn: (val: boolean) => void, windowId: string) => {
    openFn(true);
    setMinimizedWindows(prev => {
      const next = new Set(prev);
      next.delete(windowId);
      return next;
    });
  };

  return (
    <AnimatePresence mode="wait">
      {isPoweredOff ? (
        <motion.div 
          key="powered-off"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black flex items-center justify-center z-[2000]"
        >
          <button 
            onClick={() => setIsPoweredOff(false)}
            className="p-6 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all group shadow-[0_0_50px_rgba(255,255,255,0.05)]"
          >
            <Power className="w-12 h-12 text-white/20 group-hover:text-red-500 transition-colors" />
          </button>
        </motion.div>
      ) : booting ? (
        <motion.div key={`boot-${booting}`} exit={{ opacity: 0 }}>
          <BootScreen onComplete={handleOnComplete} />
        </motion.div>
      ) : !isLoggedIn ? (
        <motion.div 
          key="login" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <LoginScreen 
            onLogin={() => setIsLoggedIn(true)} 
            onPowerOff={handlePowerOff}
            onRestart={handleRestart}
          />
        </motion.div>
      ) : (
        <motion.div 
          key="desktop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen w-full bg-cover bg-center bg-no-repeat overflow-hidden relative font-sans"
          style={{ 
            backgroundImage: 'url("https://images.wallpapersden.com/image/download/kali-linux-dragon-logo_bGZma2aUmZqaraWkpJRmbmdlrWZlbWU.jpg")',
            backgroundColor: '#0a0a0a'
          }}
        >
          {/* Top Panel */}
          <div className="h-8 w-full bg-black/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-2 z-[100]">
            <div className="flex items-center gap-4 h-full">
              <button className="p-1 hover:bg-white/10 rounded transition-colors">
                <img 
                  src="https://www.kali.org/images/kali-logo.svg" 
                  alt="Kali" 
                  className="w-5 h-5 brightness-200"
                />
              </button>
              <div className="hidden md:flex items-center gap-4 text-[11px] font-bold text-white/60 uppercase tracking-tighter">
                <button className="hover:text-white transition-colors">Applications</button>
                <button className="hover:text-white transition-colors">Places</button>
                <span className="text-blue-400/40 ml-4 select-none">bl4ck30x OS v1.0</span>
              </div>
              <div className="h-4 w-[1px] bg-white/10 mx-1" />
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsTerminalOpen(true)}
                  className="p-1 hover:bg-white/10 rounded transition-colors text-white/60 hover:text-white"
                >
                  <TerminalIcon className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsBrowserOpen(true)}
                  className="p-1 hover:bg-white/10 rounded transition-colors text-white/60 hover:text-white"
                >
                  <Globe className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 h-full">
              <div className="flex items-center gap-3 text-white/60">
                {isOnline ? (
                  <Wifi className="w-3.5 h-3.5 text-blue-400" />
                ) : (
                  <Wifi className="w-3.5 h-3.5 text-red-500 opacity-50" />
                )}
                <Volume2 className="w-3.5 h-3.5" />
                <Battery className="w-3.5 h-3.5" />
              </div>
              <div className="h-4 w-[1px] bg-white/10 mx-1" />
              <div className="text-[11px] font-bold text-white/80 tracking-tight">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="flex items-center gap-1 ml-2">
                <div className="flex items-center gap-2 px-2 py-0.5 bg-white/5 rounded-full border border-white/10">
                  <img 
                    src="https://github.com/w1hi4.png" 
                    alt="w1hi4" 
                    className="w-4 h-4 rounded-full"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-[10px] font-bold text-white/60">bl4ck30x</span>
                </div>
                <button 
                  onClick={handleRestart}
                  className="p-1 hover:bg-white/10 rounded transition-colors text-white/40 hover:text-blue-400"
                  title="Restart"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={handleLogout}
                  className="p-1 hover:bg-white/10 rounded transition-colors text-white/40 hover:text-red-400"
                  title="Logout"
                >
                  <User className="w-3.5 h-3.5" />
                </button>
              </div>
              <button 
                onClick={handlePowerOff}
                className="p-1 hover:bg-red-500/20 rounded transition-colors text-white/60 hover:text-red-500"
                title="Power Off"
              >
                <Power className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Desktop Content */}
          <div className="p-4 grid grid-flow-col grid-rows-[repeat(auto-fill,100px)] gap-4 h-[calc(100vh-32px)]">
            <DesktopIcon 
              icon={User} 
              label="bl4ck30x Profile" 
              color="text-blue-500"
              onClick={() => setIsPortfolioOpen(true)}
            />
            <DesktopIcon 
              icon={Activity} 
              label="System Health" 
              color="text-green-400"
              onClick={() => setIsSystemMonitorOpen(true)}
            />
            <DesktopIcon 
              icon={Sun} 
              label="Weather" 
              color="text-yellow-400"
              onClick={() => setIsWeatherOpen(true)}
            />
            <DesktopIcon 
              icon={TrendingUp} 
              label="Market Pulse" 
              color="text-orange-400"
              onClick={() => setIsCryptoOpen(true)}
            />
            <DesktopIcon 
              icon={TerminalIcon} 
              label="Terminal Emulator" 
              onClick={() => setIsTerminalOpen(true)}
              color="text-[#00ff00]"
            />
            <DesktopIcon 
              icon={Gamepad2} 
              label="Snake Game" 
              onClick={() => setIsSnakeOpen(true)}
              color="text-green-500"
            />
            <DesktopIcon 
              icon={Gamepad2} 
              label="Minesweeper" 
              onClick={() => setIsMinesweeperOpen(true)}
              color="text-red-500"
            />
            <DesktopIcon 
              icon={Gamepad2} 
              label="CyberRunner" 
              onClick={() => openWindow(setIsCyberRunnerOpen, 'cyberrunner')}
              color="text-blue-400"
            />
          </div>

          {/* Windows Layer */}
          <AnimatePresence>
            {isTerminalOpen && !minimizedWindows.has('terminal') && (
              <Window 
                key="terminal-window"
                title="bl4ck30x OS Terminal" 
                onClose={() => setIsTerminalOpen(false)}
                onMinimize={() => toggleMinimize('terminal')}
                icon={<TerminalIcon className="w-4 h-4" />}
              >
                <Terminal />
              </Window>
            )}
            {isBrowserOpen && !minimizedWindows.has('browser') && (
              <Window 
                key="browser-window"
                title="Chromium - GitHub" 
                onClose={() => setIsBrowserOpen(false)}
                onMinimize={() => toggleMinimize('browser')}
                icon={<Globe className="w-4 h-4" />}
              >
                <Browser />
              </Window>
            )}
            {isSnakeOpen && !minimizedWindows.has('snake') && (
              <Window 
                key="snake-window"
                title="Snake Game" 
                onClose={() => setIsSnakeOpen(false)}
                onMinimize={() => toggleMinimize('snake')}
                icon={<Gamepad2 className="w-4 h-4" />}
              >
                <SnakeGame />
              </Window>
            )}
            {isMinesweeperOpen && !minimizedWindows.has('minesweeper') && (
              <Window 
                key="minesweeper-window"
                title="Minesweeper" 
                onClose={() => setIsMinesweeperOpen(false)}
                onMinimize={() => toggleMinimize('minesweeper')}
                icon={<Gamepad2 className="w-4 h-4" />}
              >
                <Minesweeper />
              </Window>
            )}
            {isPortfolioOpen && !minimizedWindows.has('portfolio') && (
              <Window 
                key="portfolio-window"
                title="bl4ck30x Portfolio" 
                onClose={() => setIsPortfolioOpen(false)}
                onMinimize={() => toggleMinimize('portfolio')}
                icon={<FileText className="w-4 h-4" />}
              >
                <PortfolioText />
              </Window>
            )}
            {isSystemMonitorOpen && !minimizedWindows.has('system-monitor') && (
              <Window 
                key="system-monitor-window"
                title="System Monitor - [Pulse]" 
                onClose={() => setIsSystemMonitorOpen(false)}
                onMinimize={() => toggleMinimize('system-monitor')}
                icon={<Activity className="w-4 h-4 text-green-400" />}
              >
                <SystemMonitor />
              </Window>
            )}
            {isWeatherOpen && !minimizedWindows.has('weather') && (
              <Window 
                key="weather-window"
                title="Weather - [Atmosphere]" 
                onClose={() => setIsWeatherOpen(false)}
                onMinimize={() => toggleMinimize('weather')}
                icon={<Sun className="w-4 h-4 text-yellow-400" />}
              >
                <Weather />
              </Window>
            )}
            {isCryptoOpen && !minimizedWindows.has('crypto') && (
              <Window 
                key="crypto-window"
                title="Market Pulse - [Crypto]" 
                onClose={() => setIsCryptoOpen(false)}
                onMinimize={() => toggleMinimize('crypto')}
                icon={<TrendingUp className="w-4 h-4 text-orange-400" />}
              >
                <CryptoTracker />
              </Window>
            )}
            {isCyberRunnerOpen && !minimizedWindows.has('cyberrunner') && (
              <Window 
                key="cyberrunner-window"
                title="CyberRunner v1.0" 
                onClose={() => setIsCyberRunnerOpen(false)}
                onMinimize={() => toggleMinimize('cyberrunner')}
                icon={<Gamepad2 className="w-4 h-4" />}
              >
                <CyberRunner />
              </Window>
            )}
          </AnimatePresence>

          {/* Professional Floating AI Assistant Widget */}
          <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[1000] flex flex-col items-end gap-3 md:gap-4 w-full max-w-[calc(100vw-32px)] md:w-auto">
            <AnimatePresence>
              {isAIAssistantOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  className="w-full md:w-[400px] h-[70vh] md:h-[600px] bg-[#0d0d0d]/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
                >
                  <div className="px-4 py-3 bg-blue-500/10 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-bold text-white/90 uppercase tracking-widest">bl4ck30x Intelligence</span>
                    </div>
                    <button 
                      onClick={() => setIsAIAssistantOpen(false)}
                      className="p-1 hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <AIAssistant />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setIsAIAssistantOpen(!isAIAssistantOpen)}
              className={`p-4 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group relative ${
                isAIAssistantOpen 
                  ? 'bg-red-500/20 border border-red-500/30' 
                  : 'bg-blue-600 border border-blue-400/50 shadow-[0_0_30px_rgba(37,99,235,0.4)]'
              }`}
            >
              {isAIAssistantOpen ? (
                <X className="w-7 h-7 text-white" />
              ) : (
                <>
                  <Bot className="w-7 h-7 text-white" />
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 border border-white/20"></span>
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Bottom Dock */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl z-40">
            <button 
              onClick={() => openWindow(setIsTerminalOpen, 'terminal')}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all hover:scale-110 text-[#00ff00]"
            >
              <TerminalIcon className="w-6 h-6" />
            </button>
            <button 
              onClick={() => openWindow(setIsBrowserOpen, 'browser')}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all hover:scale-110 text-blue-400"
            >
              <Globe className="w-6 h-6" />
            </button>
            <button 
              onClick={() => openWindow(setIsSystemMonitorOpen, 'system-monitor')}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all hover:scale-110 text-green-400"
              title="System Monitor"
            >
              <Cpu className="w-6 h-6" />
            </button>
            <button 
              onClick={() => openWindow(setIsWeatherOpen, 'weather')}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all hover:scale-110 text-yellow-400"
              title="Weather"
            >
              <Sun className="w-6 h-6" />
            </button>
            <button 
              onClick={() => openWindow(setIsCryptoOpen, 'crypto')}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all hover:scale-110 text-orange-400"
              title="Market Pulse"
            >
              <TrendingUp className="w-6 h-6" />
            </button>
            <button 
              onClick={() => openWindow(setIsPortfolioOpen, 'portfolio')}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all hover:scale-110 text-yellow-400"
              title="Portfolio"
            >
              <Folder className="w-6 h-6" />
            </button>
            <button 
              onClick={() => openWindow(setIsSnakeOpen, 'snake')}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all hover:scale-110 text-green-400"
              title="Snake"
            >
              <Gamepad2 className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
