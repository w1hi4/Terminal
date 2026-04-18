import React, { useState, useEffect, useCallback, useRef } from 'react';

const CyberRunner: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [playerY, setPlayerY] = useState(0);
  const [obstacles, setObstacles] = useState<{ x: number, type: number }[]>([]);
  const [velocity, setVelocity] = useState(0);
  
  const requestRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const resetGame = useCallback(() => {
    setScore(0);
    setPlayerY(0);
    setObstacles([]);
    setVelocity(0);
    setGameOver(false);
    setIsPlaying(false);
  }, []);

  const jump = useCallback(() => {
    if (!isPlaying) {
      if (gameOver) resetGame();
      setIsPlaying(true);
      return;
    }
    if (playerY === 0) {
      setVelocity(12);
    }
  }, [isPlaying, gameOver, playerY, resetGame]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
      if (gameOver && e.code === 'Enter') {
        resetGame();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jump, gameOver, resetGame]);

  const update = useCallback((time: number) => {
    if (!isPlaying || gameOver) {
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(update);
      return;
    }
    
    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;

    // Update Player
    setPlayerY(y => {
      const newY = y + velocity;
      if (newY <= 0) {
        setVelocity(0);
        return 0;
      }
      setVelocity(v => v - 0.6); // Gravity
      return newY;
    });

    // Update Obstacles
    setObstacles(obs => {
      const newObs = obs.map(o => ({ ...o, x: o.x - 5 })).filter(o => o.x > -50);
      
      // Spawn new obstacle
      if (newObs.length === 0 || newObs[newObs.length - 1].x < 400) {
        if (Math.random() < 0.02) {
          newObs.push({ x: 800, type: Math.floor(Math.random() * 3) });
        }
      }

      // Collision detection
      const playerRect = { left: 50, right: 90, top: 200 - playerY - 40, bottom: 200 - playerY };
      for (const o of newObs) {
        const obstacleRect = { left: o.x, right: o.x + 30, top: 200 - 30, bottom: 200 };
        if (
          playerRect.right > obstacleRect.left &&
          playerRect.left < obstacleRect.right &&
          playerRect.bottom > obstacleRect.top
        ) {
          setGameOver(true);
          setIsPlaying(false);
        }
      }

      return newObs;
    });

    setScore(s => s + 1);
    requestRef.current = requestAnimationFrame(update);
  }, [isPlaying, gameOver, velocity, playerY]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef.current);
  }, [update]);

  return (
    <div className="h-full w-full bg-[#0a0a0a] flex flex-col items-center justify-center p-4 font-mono text-white overflow-hidden select-none">
      <div className="mb-4 flex justify-between w-full max-w-[600px]">
        <span className="text-blue-400 font-bold uppercase tracking-widest">Score: {Math.floor(score / 10)}</span>
        <span className="text-white/40 text-[10px] uppercase tracking-widest">w1hi4 CyberRunner v1.0</span>
      </div>

      <div className="relative w-full max-w-[600px] h-[200px] bg-[#111] border-b-2 border-blue-500/50 overflow-hidden">
        {/* Player */}
        <div 
          className="absolute left-[50px] w-10 h-10 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] rounded-sm flex items-center justify-center"
          style={{ bottom: playerY }}
        >
          <div className="w-6 h-1 bg-white/40 absolute top-2" />
          <div className="w-2 h-2 bg-white rounded-full absolute top-4 left-2" />
          <div className="w-2 h-2 bg-white rounded-full absolute top-4 right-2" />
        </div>

        {/* Obstacles */}
        {obstacles.map((o, i) => (
          <div 
            key={i}
            className="absolute bottom-0 w-8 bg-red-500/80 border-t-2 border-red-400"
            style={{ left: o.x, height: o.type === 0 ? 30 : o.type === 1 ? 50 : 40 }}
          >
            <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(0,0,0,0.2)_5px,rgba(0,0,0,0.2)_10px)]" />
          </div>
        ))}

        {/* Ground lines */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500/20" />

        {/* Overlay */}
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-center">
            <h2 className="text-xl font-bold text-blue-400 mb-4 uppercase tracking-widest">Ready to Run?</h2>
            <div className="px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded text-[10px] font-bold uppercase tracking-[0.3em] animate-pulse">
              Press Space to Start
            </div>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-2 uppercase tracking-tighter">System Overload</h2>
            <p className="text-xs text-white/60 mb-6 uppercase tracking-widest">Connection lost at {Math.floor(score / 10)} units.</p>
            <div className="px-4 py-2 bg-white/10 border border-white/20 rounded text-[10px] font-bold uppercase tracking-[0.3em] animate-pulse">
              Press Enter to Reboot
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <p className="text-[10px] text-white/40 uppercase tracking-widest leading-loose">
          Space / Up to Jump • Avoid the Firewalls<br/>
          <span className="text-blue-500/60">Built for w1hi4 OS</span>
        </p>
      </div>
    </div>
  );
};

export default CyberRunner;
