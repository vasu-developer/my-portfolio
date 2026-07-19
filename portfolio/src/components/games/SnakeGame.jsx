import React, { useState, useEffect, useRef } from "react";
import { playSnakeEat, playGameOver, playSnakeMove } from "./AudioSynth";
import { 
  FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight,
  FaPlay, FaPause, FaRedo, FaVolumeMute, FaVolumeUp 
} from "react-icons/fa";

// Grid configuration
const COLS = 20;
const ROWS = 15;
const INITIAL_SPEED = 180; // ms per tick
const MIN_SPEED = 55;
const SPEED_INCREMENT = 5;

const SNAKE_SPEEDS = {
  easy: 240,
  medium: 180,
  hard: 110
};

export default function SnakeGame() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("portfolio_snake_highscore_2d_proportional");
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [skin, setSkin] = useState("neon"); // 'classic' (Nokia LCD) or 'neon' (Cyberpunk)
  const [isMuted, setIsMuted] = useState(false);
  const [difficulty, setDifficulty] = useState("medium"); // 'easy', 'medium', or 'hard'

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  // Game state in refs to avoid double-triggers in setInterval
  const snakeRef = useRef([[10, 7], [9, 7], [8, 7]]);
  const directionRef = useRef([1, 0]);
  const foodRef = useRef([14, 7]);
  const speedRef = useRef(180);
  const gameLoopRef = useRef(null);

  const handleDifficultyChange = (level) => {
    setDifficulty(level);
    speedRef.current = SNAKE_SPEEDS[level];
  };

  // Sync high scores
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("portfolio_snake_highscore_2d_proportional", score.toString());
    }
  }, [score, highScore]);

  // Handle arrow key controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) {
        e.preventDefault();
      }

      if (!isStarted || isGameOver || isPaused) return;

      const currentDir = directionRef.current;
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          if (currentDir[1] === 0) {
            directionRef.current = [0, -1];
            if (!isMuted) playSnakeMove();
          }
          break;
        case "ArrowDown":
        case "s":
        case "S":
          if (currentDir[1] === 0) {
            directionRef.current = [0, 1];
            if (!isMuted) playSnakeMove();
          }
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          if (currentDir[0] === 0) {
            directionRef.current = [-1, 0];
            if (!isMuted) playSnakeMove();
          }
          break;
        case "ArrowRight":
        case "d":
        case "D":
          if (currentDir[0] === 0) {
            directionRef.current = [1, 0];
            if (!isMuted) playSnakeMove();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isStarted, isGameOver, isPaused, isMuted]);

  // Game Loop interval manager
  useEffect(() => {
    if (!isStarted || isGameOver || isPaused) {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      return;
    }

    const gameStep = () => {
      const snake = [...snakeRef.current];
      const head = snake[0];
      const dir = directionRef.current;
      const nextHead = [head[0] + dir[0], head[1] + dir[1]];

      // Boundary Collisions
      if (nextHead[0] < 0 || nextHead[0] >= COLS || nextHead[1] < 0 || nextHead[1] >= ROWS) {
        triggerGameOver();
        return;
      }

      // Self Collisions
      for (let i = 0; i < snake.length; i++) {
        if (snake[i][0] === nextHead[0] && snake[i][1] === nextHead[1]) {
          triggerGameOver();
          return;
        }
      }

      // Move Snake
      snake.unshift(nextHead);

      // Check if food eaten
      if (nextHead[0] === foodRef.current[0] && nextHead[1] === foodRef.current[1]) {
        setScore(s => s + 10);
        if (!isMuted) playSnakeEat();
        spawnFood(snake);
        speedRef.current = Math.max(MIN_SPEED, speedRef.current - SPEED_INCREMENT);
        
        // Restart interval with new speed
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = setInterval(gameStep, speedRef.current);
      } else {
        snake.pop();
      }

      snakeRef.current = snake;
      draw();
    };

    gameLoopRef.current = setInterval(gameStep, speedRef.current);
    return () => clearInterval(gameLoopRef.current);
  }, [isStarted, isGameOver, isPaused, isMuted, difficulty]);

  // Handle Resize of canvas to ensure proper cell measurements on widescreen
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      draw();
    };

    window.addEventListener("resize", handleResize);
    // Initial call
    setTimeout(handleResize, 100);

    return () => window.removeEventListener("resize", handleResize);
  }, [skin, isStarted, isPaused, isGameOver]);

  // Redraw when states change
  useEffect(() => {
    draw();
  }, [skin, isStarted, isPaused, isGameOver]);

  const triggerGameOver = () => {
    setIsGameOver(true);
    if (!isMuted) playGameOver();
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
  };

  const spawnFood = (currentSnake) => {
    let newFood = null;
    let attempts = 0;
    while (!newFood && attempts < 300) {
      attempts++;
      const fx = Math.floor(Math.random() * COLS);
      const fy = Math.floor(Math.random() * ROWS);
      const onSnake = currentSnake.some(([sx, sy]) => sx === fx && sy === fy);
      if (!onSnake) {
        newFood = [fx, fy];
      }
    }
    if (newFood) {
      foodRef.current = newFood;
    } else {
      triggerGameOver();
    }
  };

  const startGame = () => {
    snakeRef.current = [[10, 7], [9, 7], [8, 7]];
    directionRef.current = [1, 0];
    speedRef.current = SNAKE_SPEEDS[difficulty];
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    setIsStarted(true);
    spawnFood(snakeRef.current);
    
    // Fit canvas bounds immediately on click
    setTimeout(() => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        draw();
      }
    }, 50);
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear Canvas
    ctx.clearRect(0, 0, width, height);

    // Dynamic scale ratios based on active size
    const cellW = width / COLS;
    const cellH = height / ROWS;
    const ux = cellW / 12;
    const uy = cellH / 12;

    // Theme definition
    const palette = {
      classic: {
        bg: "#c7f0d8",
        grid: "#b7dfc8",
        border: "#2d3a1a",
        snakeHead: "#2d3a1a",
        snakeBody: "#2d3a1a",
        food: "#2d3a1a"
      },
      neon: {
        bg: "#0b0f19",
        grid: "#161b2d",
        border: "#1e293b",
        snakeHead: "#ec4899",
        snakeBody: "#8b5cf6",
        food: "#06b6d4"
      }
    };

    const colors = palette[skin];

    // Background fill
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, width, height);

    // Grid Helpers
    ctx.fillStyle = colors.grid;
    for (let x = 0; x < COLS; x++) {
      for (let y = 0; y < ROWS; y++) {
        if (skin === "classic") {
          ctx.fillRect(x * cellW, y * cellH, 1, 1);
        } else {
          ctx.strokeStyle = colors.grid;
          ctx.lineWidth = 0.5;
          ctx.strokeRect(x * cellW, y * cellH, cellW, cellH);
        }
      }
    }

    // Outer border
    ctx.strokeStyle = colors.border;
    ctx.lineWidth = 3;
    ctx.strokeRect(1.5, 1.5, width - 3, height - 3);

    if (!isStarted) {
      ctx.fillStyle = colors.border;
      ctx.font = 'bold 20px font-display, sans-serif';
      ctx.textAlign = "center";
      ctx.fillText("SNAKE & DOTS", width / 2, height / 2 - 10);
      
      ctx.font = '13px sans-serif';
      ctx.fillText("Press Play to begin", width / 2, height / 2 + 15);
      return;
    }

    // Draw Food Apple (fully proportional to cell sizing)
    const food = foodRef.current;
    ctx.fillStyle = colors.food;
    const fx = food[0] * cellW;
    const fy = food[1] * cellH;

    if (skin === "classic") {
      // Proportional cross pixel apple shape (matching classic Nokia)
      ctx.fillRect(fx + 4 * ux, fy + 2 * uy, 4 * ux, 8 * uy);
      ctx.fillRect(fx + 2 * ux, fy + 4 * uy, 8 * ux, 4 * uy);
      ctx.fillRect(fx + 5 * ux, fy + 1 * uy, 2 * ux, 1 * uy); // stem
    } else {
      // Proportional circular fruit
      ctx.beginPath();
      ctx.arc(fx + cellW / 2, fy + cellH / 2, Math.min(cellW, cellH) / 2.5, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Draw Snake (proportional dimensions)
    const snake = snakeRef.current;
    snake.forEach(([sx, sy], index) => {
      const isHead = index === 0;
      ctx.fillStyle = isHead ? colors.snakeHead : colors.snakeBody;

      const px = sx * cellW;
      const py = sy * cellH;

      if (skin === "classic") {
        // Draw segmented blocks with a 1-unit spacing border
        ctx.fillRect(px + ux, py + uy, cellW - 2 * ux, cellH - 2 * uy);
        
        // Eyes
        if (isHead) {
          ctx.fillStyle = colors.bg;
          const [dx, dy] = directionRef.current;
          if (dx !== 0) {
            ctx.fillRect(px + (dx > 0 ? 8 * ux : 2 * ux), py + 3 * uy, 2 * ux, 2 * uy);
            ctx.fillRect(px + (dx > 0 ? 8 * ux : 2 * ux), py + 7 * uy, 2 * ux, 2 * uy);
          } else {
            ctx.fillRect(px + 3 * ux, py + (dy > 0 ? 8 * uy : 2 * uy), 2 * ux, 2 * uy);
            ctx.fillRect(px + 7 * ux, py + (dy > 0 ? 8 * uy : 2 * uy), 2 * ux, 2 * uy);
          }
        }
      } else {
        // Neon segments with round borders
        ctx.beginPath();
        const r = 3;
        ctx.roundRect(px + ux, py + uy, cellW - 2 * ux, cellH - 2 * uy, r);
        ctx.fill();

        // Neon eyeballs
        if (isHead) {
          ctx.fillStyle = "#ffffff";
          const [dx, dy] = directionRef.current;
          if (dx !== 0) {
            ctx.fillRect(px + (dx > 0 ? 8 * ux : 2 * ux), py + 3 * uy, 2 * ux, 2 * uy);
            ctx.fillRect(px + (dx > 0 ? 8 * ux : 2 * ux), py + 7 * uy, 2 * ux, 2 * uy);
          } else {
            ctx.fillRect(px + 3 * ux, py + (dy > 0 ? 8 * uy : 2 * uy), 2 * ux, 2 * uy);
            ctx.fillRect(px + 7 * ux, py + (dy > 0 ? 8 * uy : 2 * uy), 2 * ux, 2 * uy);
          }
        }
      }
    });
  };

  const handleVirtualDir = (dx, dy) => {
    if (!isStarted || isGameOver || isPaused) return;
    const currentDir = directionRef.current;
    if (dx !== 0 && currentDir[0] === 0) {
      directionRef.current = [dx, dy];
      if (!isMuted) playSnakeMove();
    }
    if (dy !== 0 && currentDir[1] === 0) {
      directionRef.current = [dx, dy];
      if (!isMuted) playSnakeMove();
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full select-none" ref={containerRef}>
      
      {/* HUD stats header (In normal flow above the screen, never covering game screen) */}
      <div className="px-5 py-3.5 bg-white/70 border border-slate-200/80 rounded-2xl shadow-sm backdrop-blur-md flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[9px] tracking-wider text-slate-450 uppercase font-semibold">Score</span>
            <span className="text-base font-bold font-mono text-emerald-600">{score}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] tracking-wider text-slate-450 uppercase font-semibold">Best</span>
            <span className="text-xs font-semibold font-mono text-slate-500">{highScore}</span>
          </div>
        </div>
        
        <span className="text-[9px] text-slate-455 font-bold uppercase tracking-widest font-mono bg-slate-100 border border-slate-200/50 px-2.5 py-1 rounded-lg">
          {skin === "classic" ? "LCD BACKLIGHT" : "CYBER NEON"}
        </span>
      </div>

      {/* FULL WIDTH SCREEN DISPLAY */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-slate-950 border border-slate-700/60 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center">
        
        {/* Proportional canvas display layer */}
        <canvas 
          ref={canvasRef} 
          className="w-full h-full block bg-slate-900"
          style={{ imageRendering: "pixelated" }}
        />

        {/* Menu Screen Overlays on Gameover/Paused */}
        {!isStarted && (
          <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center text-center p-6 animate-fadeIn">
            <h3 className="text-2xl font-bold font-display tracking-tight text-white mb-2">
              Nokia Snake & Dots
            </h3>
            <p className="text-xs text-slate-400 max-w-[280px] mb-6 leading-relaxed">
              Play the classic Nokia mobile snake on a responsive widescreen layout. Arrow keys or WASD to control.
            </p>
            <button
              onClick={startGame}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-650 hover:from-emerald-500 hover:to-teal-555 text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-emerald-500/25 flex items-center gap-2 cursor-pointer"
            >
              <FaPlay className="text-[10px]" /> Play Now
            </button>
          </div>
        )}

        {isGameOver && (
          <div className="absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-center text-center p-6 animate-fadeIn">
            <h3 className="text-3xl font-extrabold font-display tracking-tight text-rose-505 mb-1">
              GAME OVER
            </h3>
            <p className="text-sm text-slate-455 mb-6 font-medium">
              You scored <span className="text-white font-bold">{score}</span> points!
            </p>
            <button
              onClick={startGame}
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-505 text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-rose-500/20 flex items-center gap-2 cursor-pointer"
            >
              <FaRedo className="text-[10px]" /> Play Again
            </button>
          </div>
        )}

        {isStarted && isPaused && !isGameOver && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6">
            <h3 className="text-3xl font-extrabold font-display tracking-tight text-emerald-400 mb-6">
              PAUSED
            </h3>
            <button
              onClick={() => setIsPaused(false)}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-505 text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
            >
              <FaPlay className="text-[10px]" /> Resume
            </button>
          </div>
        )}
      </div>

      {/* BOTTOM CONSOLE BAR CONTROLS */}
      <div className="p-4 bg-white/70 border border-slate-200/80 rounded-2xl shadow-sm backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Playback actions */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={startGame}
            className="flex-1 md:flex-none px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          >
            <FaRedo className="text-[9px]" /> Start Game
          </button>
          <button
            onClick={() => {
              if (isStarted && !isGameOver) {
                setIsPaused(!isPaused);
              }
            }}
            disabled={!isStarted || isGameOver}
            className="flex-1 md:flex-none px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          >
            {isPaused ? <FaPlay className="text-[9px]" /> : <FaPause className="text-[9px]" />}
            {isPaused ? "Resume" : "Pause"}
          </button>
        </div>

        {/* Mobile D-Pad Control pad */}
        <div className="flex items-center gap-1.5 py-1 bg-slate-100/90 rounded-2xl px-3 border border-slate-200/50 shadow-inner">
          <button
            onClick={() => handleVirtualDir(-1, 0)}
            className="p-2 bg-white text-slate-750 hover:bg-slate-50 hover:text-slate-950 active:scale-95 rounded-xl border border-slate-250/60 shadow-sm transition-all"
            title="Move Left"
          >
            <FaArrowLeft className="text-xs" />
          </button>
          <div className="flex flex-col gap-1">
            <button
              onClick={() => handleVirtualDir(0, -1)}
              className="p-2 bg-white text-slate-750 hover:bg-slate-50 hover:text-slate-950 active:scale-95 rounded-xl border border-slate-250/60 shadow-sm transition-all"
              title="Move Up"
            >
              <FaArrowUp className="text-xs" />
            </button>
            <button
              onClick={() => handleVirtualDir(0, 1)}
              className="p-2 bg-white text-slate-750 hover:bg-slate-50 hover:text-slate-950 active:scale-95 rounded-xl border border-slate-250/60 shadow-sm transition-all"
              title="Move Down"
            >
              <FaArrowDown className="text-xs" />
            </button>
          </div>
          <button
            onClick={() => handleVirtualDir(1, 0)}
            className="p-2 bg-white text-slate-750 hover:bg-slate-50 hover:text-slate-950 active:scale-95 rounded-xl border border-slate-250/60 shadow-sm transition-all"
            title="Move Right"
          >
            <FaArrowRight className="text-xs" />
          </button>
        </div>

        {/* Difficulty Selector */}
        <div className="flex gap-1 p-0.5 bg-slate-100/90 rounded-xl border border-slate-200/50">
          <button
            onClick={() => handleDifficultyChange("easy")}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
              difficulty === "easy" 
                ? "bg-white text-slate-900 shadow-sm" 
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Easy
          </button>
          <button
            onClick={() => handleDifficultyChange("medium")}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
              difficulty === "medium" 
                ? "bg-white text-slate-900 shadow-sm" 
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Medium
          </button>
          <button
            onClick={() => handleDifficultyChange("hard")}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
              difficulty === "hard" 
                ? "bg-white text-slate-900 shadow-sm" 
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Hard
          </button>
        </div>

        {/* Skin Themes & sound */}
        <div className="flex items-center justify-between md:justify-end gap-5 w-full md:w-auto">
          <div className="flex gap-1 p-0.5 bg-slate-100/90 rounded-xl border border-slate-200/50">
            <button
              onClick={() => setSkin("classic")}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                skin === "classic" 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              LCD Skin
            </button>
            <button
              onClick={() => setSkin("neon")}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                skin === "neon" 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Neon Skin
            </button>
          </div>

          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 bg-slate-100 hover:bg-slate-200 active:scale-95 rounded-xl text-slate-600 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm text-xs font-semibold"
          >
            {isMuted ? <FaVolumeMute className="text-rose-500" /> : <FaVolumeUp className="text-emerald-500" />}
            {isMuted ? "Mute" : "Sound"}
          </button>
        </div>

      </div>

    </div>
  );
}
