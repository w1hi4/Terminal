import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const INITIAL_FOOD = { x: 5, y: 5 };

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  
  const moveSnake = useCallback(() => {
    if (gameOver) return;

    setSnake(prevSnake => {
      const head = { ...prevSnake[0] };
      head.x += direction.x;
      head.y += direction.y;

      // Check collisions
      if (
        head.x < 0 || head.x >= GRID_SIZE ||
        head.y < 0 || head.y >= GRID_SIZE ||
        prevSnake.some(segment => segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      // Check food
      if (head.x === food.x && head.y === food.y) {
        setScore(s => s + 10);
        setFood({
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE)
        });
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver && e.key === 'Enter') {
        resetGame();
        return;
      }

      switch (e.key) {
        case 'ArrowUp': if (direction.y === 0) setDirection({ x: 0, y: -1 }); break;
        case 'ArrowDown': if (direction.y === 0) setDirection({ x: 0, y: 1 }); break;
        case 'ArrowLeft': if (direction.x === 0) setDirection({ x: -1, y: 0 }); break;
        case 'ArrowRight': if (direction.x === 0) setDirection({ x: 1, y: 0 }); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const interval = setInterval(moveSnake, 150);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, [moveSnake, direction, gameOver]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(INITIAL_FOOD);
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className="h-full w-full bg-[#1a1a1a] flex flex-col items-center justify-center p-4 font-mono text-white relative">
      <div className="mb-4 flex justify-between w-full max-w-[400px]">
        <span className="text-green-400 font-bold uppercase tracking-widest">Score: {score}</span>
        {gameOver && <span className="text-red-500 font-bold animate-pulse uppercase">Game Over!</span>}
      </div>
      
      <div 
        className="relative bg-black border-2 border-white/10 rounded-lg overflow-hidden shrink-0"
        style={{ 
          width: 'min(90vw, 400px)', 
          height: 'min(90vw, 400px)',
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          const isSnake = snake.some(s => s.x === x && s.y === y);
          const isFood = food.x === x && food.y === y;
          const isHead = snake[0].x === x && snake[0].y === y;

          return (
            <div 
              key={i} 
              className={`w-full h-full border-[0.5px] border-white/5 ${
                isHead ? 'bg-green-400 rounded-sm' : 
                isSnake ? 'bg-green-600/60' : 
                isFood ? 'bg-red-500 animate-pulse rounded-full scale-75' : ''
              }`}
            />
          );
        })}

        {gameOver && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4">
            <h2 className="text-2xl font-bold text-red-500 mb-2 uppercase tracking-tighter">System Failure</h2>
            <p className="text-xs text-white/60 mb-6 uppercase tracking-widest">Your snake has been terminated.</p>
            <div className="px-4 py-2 bg-white/10 border border-white/20 rounded text-[10px] font-bold uppercase tracking-[0.3em] animate-pulse">
              Press Enter to Reboot
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col items-center gap-4">
        <div className="md:hidden grid grid-cols-3 gap-2">
          <div />
          <button 
            className="w-12 h-12 flex items-center justify-center bg-white/10 border border-white/20 rounded-xl active:bg-green-500/20 active:border-green-500/50 transition-all"
            onPointerDown={() => direction.y === 0 && setDirection({ x: 0, y: -1 })}
          >
            <ChevronUp className="w-6 h-6 text-green-400" />
          </button>
          <div />
          <button 
            className="w-12 h-12 flex items-center justify-center bg-white/10 border border-white/20 rounded-xl active:bg-green-500/20 active:border-green-500/50 transition-all"
            onPointerDown={() => direction.x === 0 && setDirection({ x: -1, y: 0 })}
          >
            <ChevronLeft className="w-6 h-6 text-green-400" />
          </button>
          <button 
            className="w-12 h-12 flex items-center justify-center bg-white/10 border border-white/20 rounded-xl active:bg-green-500/20 active:border-green-500/50 transition-all"
            onPointerDown={() => direction.y === 0 && setDirection({ x: 0, y: 1 })}
          >
            <ChevronDown className="w-6 h-6 text-green-400" />
          </button>
          <button 
            className="w-12 h-12 flex items-center justify-center bg-white/10 border border-white/20 rounded-xl active:bg-green-500/20 active:border-green-500/50 transition-all"
            onPointerDown={() => direction.x === 0 && setDirection({ x: 1, y: 0 })}
          >
            <ChevronRight className="w-6 h-6 text-green-400" />
          </button>
        </div>
        
        {gameOver && (
          <button 
            onClick={resetGame}
            className="md:hidden px-6 py-2 bg-green-500 text-black font-bold uppercase tracking-widest rounded-lg active:scale-95 transition-transform"
          >
            Restart Game
          </button>
        )}

        <p className="text-[10px] text-white/40 flex items-center italic uppercase tracking-widest text-center">
          {window.innerWidth < 768 ? 'Use D-Pad to Navigate' : 'Use Arrow Keys to Move • Enter to Restart'}
        </p>
      </div>
    </div>
  );
};

export default SnakeGame;
