import React, { useState, useEffect, useCallback } from 'react';

const GRID_SIZE = 10;
const MINES_COUNT = 15;

interface Cell {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborCount: number;
}

const Minesweeper: React.FC = () => {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [isFlagMode, setIsFlagMode] = useState(false);

  const initGrid = useCallback(() => {
    const newGrid: Cell[][] = [];
    for (let r = 0; r < GRID_SIZE; r++) {
      const row: Cell[] = [];
      for (let c = 0; c < GRID_SIZE; c++) {
        row.push({
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborCount: 0
        });
      }
      newGrid.push(row);
    }

    // Place mines
    let minesPlaced = 0;
    while (minesPlaced < MINES_COUNT) {
      const r = Math.floor(Math.random() * GRID_SIZE);
      const c = Math.floor(Math.random() * GRID_SIZE);
      if (!newGrid[r][c].isMine) {
        newGrid[r][c].isMine = true;
        minesPlaced++;
      }
    }

    // Calculate neighbors
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (!newGrid[r][c].isMine) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = r + dr;
              const nc = c + dc;
              if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE && newGrid[nr][nc].isMine) {
                count++;
              }
            }
          }
          newGrid[r][c].neighborCount = count;
        }
      }
    }

    setGrid(newGrid);
    setGameOver(false);
    setWin(false);
  }, []);

  useEffect(() => {
    initGrid();
  }, [initGrid]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((gameOver || win) && e.key === 'Enter') {
        initGrid();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [initGrid, gameOver, win]);

  const revealCell = (r: number, c: number) => {
    if (gameOver || win || grid[r][c].isRevealed) return;

    if (isFlagMode) {
      const newGrid = [...grid.map(row => [...row])];
      newGrid[r][c].isFlagged = !newGrid[r][c].isFlagged;
      setGrid(newGrid);
      return;
    }

    if (grid[r][c].isFlagged) return;
    
    const newGrid = [...grid.map(row => [...row])];
    
    if (newGrid[r][c].isMine) {
      setGameOver(true);
      // Reveal all mines
      newGrid.forEach(row => row.forEach(cell => { if (cell.isMine) cell.isRevealed = true; }));
    } else {
      const revealRecursive = (row: number, col: number) => {
        if (row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE || newGrid[row][col].isRevealed) return;
        newGrid[row][col].isRevealed = true;
        if (newGrid[row][col].neighborCount === 0) {
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              revealRecursive(row + dr, col + dc);
            }
          }
        }
      };
      revealRecursive(r, c);
    }

    setGrid(newGrid);

    // Check win
    const unrevealedNonMines = newGrid.flat().filter(cell => !cell.isMine && !cell.isRevealed);
    if (unrevealedNonMines.length === 0) setWin(true);
  };

  const toggleFlag = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (gameOver || win || grid[r][c].isRevealed) return;
    const newGrid = [...grid.map(row => [...row])];
    newGrid[r][c].isFlagged = !newGrid[r][c].isFlagged;
    setGrid(newGrid);
  };

  if (grid.length === 0) return <div className="h-full w-full bg-[#1a1a1a] flex items-center justify-center text-white">Initializing...</div>;

  return (
    <div className="h-full w-full bg-[#1a1a1a] flex flex-col items-center justify-center p-4 font-mono text-white relative">
      <div className="mb-4 flex justify-between items-center w-full max-w-[300px]">
        <span className="text-blue-400 font-bold uppercase tracking-widest text-[10px]">Mines: {MINES_COUNT}</span>
        
        <div className="flex bg-black/40 rounded-lg p-0.5 border border-white/5">
          <button 
            onClick={() => setIsFlagMode(false)}
            className={`px-3 py-1 rounded-md text-[9px] font-bold uppercase transition-all ${!isFlagMode ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-white/40'}`}
          >
            Reveal
          </button>
          <button 
            onClick={() => setIsFlagMode(true)}
            className={`px-3 py-1 rounded-md text-[9px] font-bold uppercase transition-all ${isFlagMode ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'text-white/40'}`}
          >
            Flag
          </button>
        </div>

        {gameOver && <span className="text-red-500 font-bold uppercase animate-pulse text-[10px]">Boom!</span>}
        {win && <span className="text-green-400 font-bold uppercase animate-bounce text-[10px]">Win!</span>}
      </div>

      <div className="relative">
        <div 
          className="grid bg-[#2d2d2d] border-4 border-black/40 rounded shadow-2xl p-1"
          style={{ 
            gridTemplateColumns: `repeat(${GRID_SIZE}, 30px)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 30px)`
          }}
        >
          {grid.map((row, r) => row.map((cell, c) => (
            <button
              key={`${r}-${c}`}
              onClick={() => revealCell(r, c)}
              onContextMenu={(e) => toggleFlag(e, r, c)}
              className={`w-[28px] h-[28px] flex items-center justify-center text-sm font-bold transition-all border border-black/20 ${
                cell.isRevealed 
                  ? 'bg-[#1c1c1c] text-white/80' 
                  : 'bg-[#3d3d3d] hover:bg-[#4d4d4d] shadow-[inset_1px_1px_0_rgba(255,255,255,0.1),inset_-1px_-1px_0_rgba(0,0,0,0.2)]'
              }`}
            >
              {cell.isRevealed ? (
                cell.isMine ? '💣' : (cell.neighborCount > 0 ? cell.neighborCount : '')
              ) : (
                cell.isFlagged ? '🚩' : ''
              )}
            </button>
          )))}
        </div>

        {(gameOver || win) && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4 rounded">
            <h2 className={`text-xl font-bold mb-2 uppercase tracking-tighter ${gameOver ? 'text-red-500' : 'text-green-400'}`}>
              {gameOver ? 'Detonated' : 'Secured'}
            </h2>
            <div className="px-3 py-1.5 bg-white/10 border border-white/20 rounded text-[9px] font-bold uppercase tracking-[0.2em] animate-pulse">
              Press Enter to Reset
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col items-center gap-2">
        {(gameOver || win) && (
          <button 
            onClick={initGrid}
            className="md:hidden px-6 py-2 bg-blue-500 text-black font-bold uppercase tracking-widest rounded-lg active:scale-95 transition-transform text-xs"
          >
            New Game
          </button>
        )}
        <p className="text-[10px] text-white/40 flex items-center italic uppercase tracking-widest text-center">
          {window.innerWidth < 768 ? 'Toggle Flag/Reveal Mode to play' : 'Left-click: Reveal • Right-click: Flag • Enter: Restart'}
        </p>
      </div>
    </div>
  );
};

export default Minesweeper;
