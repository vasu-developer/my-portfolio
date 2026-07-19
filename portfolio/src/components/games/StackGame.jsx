import React, { useState, useEffect, useRef } from "react";
import { playStackPerfect, playStackPlacement, playStackSlice, playGameOver } from "./AudioSynth";
import { FaPlay, FaPause, FaRedo, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

// Virtual coordinate grid space to ensure uniform gameplay calculations on all screen sizes
const V_WIDTH = 400;
const V_HEIGHT = 500;
const BLOCK_HEIGHT = 20;
const INITIAL_WIDTH = 220;
const SLIDE_SPEED_BASE = 2.8;
const SPEED_INC_LEVEL = 0.12;
const SNAP_THRESHOLD = 6.5;

const STACK_SPEEDS = {
  easy: { base: 2.0, increment: 0.08 },
  medium: { base: 2.8, increment: 0.12 },
  hard: { base: 3.8, increment: 0.16 }
};

export default function StackGame() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("portfolio_stack_highscore_2d_full");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [combo, setCombo] = useState(0);
  const [difficulty, setDifficulty] = useState("medium"); // 'easy', 'medium', or 'hard'

  const canvasRef = useRef(null);
  
  // Ref states for rendering loops
  const blocksRef = useRef([]);
  const debrisRef = useRef([]);
  const activeBlockRef = useRef({ x: 0, w: INITIAL_WIDTH });
  const activeDirectionRef = useRef(1); // 1 = right, -1 = left
  
  const levelRef = useRef(0);
  const cameraYRef = useRef(0);
  const targetCameraYRef = useRef(0);
  
  // Animation loop runner
  const requestRef = useRef(null);

  // Sync high scores
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("portfolio_stack_highscore_2d_full", score.toString());
    }
  }, [score, highScore]);

  // Spacebar stacking trigger
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        placeBlock();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isStarted, isGameOver, isPaused]);

  // Animation frame runner
  useEffect(() => {
    const animate = () => {
      update();
      draw();
      requestRef.current = requestAnimationFrame(animate);
    };

    if (isStarted && !isPaused && !isGameOver) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      draw();
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isStarted, isPaused, isGameOver]);

  // Handle Resize of canvas to ensure proper cell measurements
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
  }, [isStarted, isPaused, isGameOver]);

  const resetGame = () => {
    levelRef.current = 0;
    cameraYRef.current = 0;
    targetCameraYRef.current = 0;
    setScore(0);
    setCombo(0);
    setIsGameOver(false);
    setIsPaused(false);
    
    // Add base block
    blocksRef.current = [{
      x: (V_WIDTH - INITIAL_WIDTH) / 2,
      w: INITIAL_WIDTH,
      y: V_HEIGHT - 45,
      color: "#475569" // slate base
    }];
    
    // Position first sliding block
    activeBlockRef.current = {
      x: 0,
      w: INITIAL_WIDTH,
      y: V_HEIGHT - 45 - BLOCK_HEIGHT
    };
    activeDirectionRef.current = 1;
    debrisRef.current = [];
    setIsStarted(true);

    // Resize canvas immediately
    setTimeout(() => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        draw();
      }
    }, 50);
  };

  const placeBlock = () => {
    if (!isStarted || isGameOver || isPaused) return;

    const level = levelRef.current;
    const blocks = blocksRef.current;
    const prevBlock = blocks[blocks.length - 1];
    const active = activeBlockRef.current;
    const currentY = active.y;

    const px = prevBlock.x;
    const pw = prevBlock.w;
    const ax = active.x;
    const aw = active.w;

    // Overlap math
    const minX = Math.max(px, ax);
    const maxX = Math.min(px + pw, ax + aw);
    const overlapW = maxX - minX;

    let finalX = minX;
    let finalW = overlapW;
    let perfect = false;

    if (overlapW <= 0) {
      // Complete miss
      setIsGameOver(true);
      if (!isMuted) playGameOver();
      // Drop whole block as debris
      spawnDebris(ax, aw, currentY, getBlockColor(level));
      return;
    }

    // Perfect alignment check
    const offset = Math.abs(ax - px);
    if (offset < SNAP_THRESHOLD) {
      finalX = px; // snap
      finalW = pw;
      perfect = true;
    } else {
      // Spawn sliced off debris chunk
      const debrisW = aw - overlapW;
      const debrisX = ax > px ? maxX : ax;
      spawnDebris(debrisX, debrisW, currentY, getBlockColor(level));
    }

    // Sound and score adjustments
    if (perfect) {
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      setScore(s => s + 10 + Math.min(nextCombo * 2, 20));
      if (!isMuted) playStackPerfect(nextCombo);
    } else {
      setCombo(0);
      setScore(s => s + 10);
      if (!isMuted) playStackSlice();
    }

    // Add block to stack
    blocksRef.current.push({
      x: finalX,
      w: finalW,
      y: currentY,
      color: getBlockColor(level)
    });

    // Advance level
    levelRef.current = level + 1;
    
    // Set up next sliding block
    activeBlockRef.current = {
      x: activeDirectionRef.current === 1 ? 0 : V_WIDTH - finalW,
      w: finalW,
      y: currentY - BLOCK_HEIGHT
    };

    // Scroll camera up if stack reaches middle height (220px from top)
    const threshold = 220;
    const stackTopHeight = V_HEIGHT - 45 - (levelRef.current * BLOCK_HEIGHT);
    if (stackTopHeight < threshold) {
      targetCameraYRef.current = threshold - stackTopHeight;
    }
  };

  const spawnDebris = (x, w, y, color) => {
    debrisRef.current.push({
      id: Date.now() + Math.random(),
      x: x,
      w: w,
      y: y,
      color: color,
      vy: 0,
      vx: (Math.random() - 0.5) * 4,
      rotation: 0,
      spin: (Math.random() - 0.5) * 0.2,
      opacity: 1.0
    });
  };

  const getBlockColor = (lvl) => {
    const hue = (lvl * 15) % 360;
    return `hsl(${hue}, 85%, 55%)`;
  };

  const update = () => {
    if (!isStarted || isPaused || isGameOver) return;

    // 1. Move camera smoothly
    cameraYRef.current += (targetCameraYRef.current - cameraYRef.current) * 0.08;

    // 2. Move sliding active block
    const level = levelRef.current;
    const config = STACK_SPEEDS[difficulty];
    const speed = config.base + level * config.increment;
    const active = activeBlockRef.current;

    active.x += activeDirectionRef.current * speed;
    
    // Bounce off walls
    if (active.x + active.w > V_WIDTH) {
      active.x = V_WIDTH - active.w;
      activeDirectionRef.current = -1;
    } else if (active.x < 0) {
      active.x = 0;
      activeDirectionRef.current = 1;
    }

    // 3. Update debris particles (gravity physics)
    debrisRef.current = debrisRef.current.map(d => {
      const nextVy = d.vy + 0.5;
      const nextY = d.y + nextVy;
      const nextX = d.x + d.vx;
      
      return {
        ...d,
        x: nextX,
        y: nextY,
        vy: nextVy,
        rotation: d.rotation + d.spin,
        opacity: d.opacity - 0.02
      };
    }).filter(d => d.opacity > 0 && d.y < V_HEIGHT + 100);
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear Screen
    ctx.clearRect(0, 0, width, height);

    // Apply scaling between Virtual Grid and Canvas pixels
    const scaleX = width / V_WIDTH;
    const scaleY = height / V_HEIGHT;

    // Background fill
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, width, height);

    // Draw background grid lines (horizontal depth markers)
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 1;
    for (let y = 0; y < V_HEIGHT; y += BLOCK_HEIGHT) {
      const renderY = ((y + cameraYRef.current) * scaleY) % height;
      ctx.beginPath();
      ctx.moveTo(0, renderY);
      ctx.lineTo(width, renderY);
      ctx.stroke();
    }

    ctx.save();
    // Offset context for vertical camera scroll
    ctx.translate(0, cameraYRef.current * scaleY);

    // 1. Draw static blocks in the stack
    blocksRef.current.forEach(block => {
      ctx.fillStyle = block.color;
      ctx.fillRect(block.x * scaleX, block.y * scaleY, block.w * scaleX, BLOCK_HEIGHT * scaleY);
      
      // Top gloss edge line
      ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
      ctx.fillRect(block.x * scaleX, block.y * scaleY, block.w * scaleX, 2);
    });

    // 2. Draw active sliding block
    if (isStarted && !isGameOver) {
      const active = activeBlockRef.current;
      ctx.fillStyle = getBlockColor(levelRef.current);
      ctx.fillRect(active.x * scaleX, active.y * scaleY, active.w * scaleX, BLOCK_HEIGHT * scaleY);
      
      // Gloss highlight
      ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
      ctx.fillRect(active.x * scaleX, active.y * scaleY, active.w * scaleX, 2);
    }

    // 3. Draw falling debris pieces
    debrisRef.current.forEach(d => {
      ctx.save();
      const cx = (d.x + d.w / 2) * scaleX;
      const cy = (d.y + BLOCK_HEIGHT / 2) * scaleY;
      ctx.translate(cx, cy);
      ctx.rotate(d.rotation);
      ctx.fillStyle = d.color;
      ctx.globalAlpha = d.opacity;
      
      // Draw centered
      const dw = d.w * scaleX;
      const dh = BLOCK_HEIGHT * scaleY;
      ctx.fillRect(-dw / 2, -dh / 2, dw, dh);
      ctx.restore();
    });

    ctx.restore();

    // 4. Score HUD Panel
    if (!isStarted) {
      ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#38bdf8";
      ctx.font = 'bold 20px font-display, sans-serif';
      ctx.textAlign = "center";
      ctx.fillText("STACK BUILDER 2D", width / 2, height / 2 - 15);
      
      ctx.fillStyle = "#94a3b8";
      ctx.font = '13px sans-serif';
      ctx.fillText("Click Play to start alignment stacking!", width / 2, height / 2 + 15);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full select-none">
      
      {/* HUD stats header (In normal flow above the screen, never covering game screen) */}
      <div className="px-5 py-3.5 bg-white/70 border border-slate-200/80 rounded-2xl shadow-sm backdrop-blur-md flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[9px] tracking-wider text-slate-450 uppercase font-semibold">Height</span>
            <span className="text-base font-bold font-mono text-cyan-600">{score}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] tracking-wider text-slate-450 uppercase font-semibold">Best Height</span>
            <span className="text-xs font-semibold font-mono text-slate-500">{highScore}</span>
          </div>
        </div>

        {/* Combo indicator */}
        {combo > 0 ? (
          <div className="px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-650 font-mono text-xs font-bold animate-pulse shadow-sm">
            PERFECT x{combo}
          </div>
        ) : (
          <span className="text-[9px] text-slate-455 font-bold uppercase tracking-widest font-mono bg-slate-100 border border-slate-200/50 px-2.5 py-1 rounded-lg">
            Stacker
          </span>
        )}
      </div>

      {/* FULL WIDTH CANVAS DISPLAY */}
      <div 
        onClick={placeBlock}
        className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-slate-900 border border-slate-700/60 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center cursor-pointer"
      >

        {/* HTML5 Canvas */}
        <canvas 
          ref={canvasRef} 
          className="block w-full h-full"
        />

        {/* Instructions banner overlay */}
        {isStarted && !isGameOver && !isPaused && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-slate-950/70 border border-slate-800/80 rounded-full text-[9px] font-sans text-slate-400 font-bold tracking-wider text-center pointer-events-none uppercase">
            Click Screen or Press Space to stack
          </div>
        )}

        {/* Game State Panel overlays */}
        {!isStarted && (
          <div 
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/90 text-center p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold font-display tracking-tight text-white mb-2">
              2D Stack Builder
            </h3>
            <p className="text-xs text-slate-400 max-w-[280px] mb-6 leading-relaxed">
              Align slabs perfectly. Edges overhang, slice off and drop. Click the display or press space to drop.
            </p>
            <button
              onClick={resetGame}
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-605 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-cyan-500/25 flex items-center gap-2 cursor-pointer"
            >
              <FaPlay className="text-[10px]" /> Play Now
            </button>
          </div>
        )}

        {isGameOver && (
          <div 
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/90 text-center p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-3xl font-extrabold font-display tracking-tight text-cyan-405 mb-1">
              GAME OVER
            </h3>
            <p className="text-sm text-slate-450 mb-6 font-medium">
              You stacked a tower height of <span className="text-white font-bold">{score}</span>!
            </p>
            <button
              onClick={resetGame}
              className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-505 text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
            >
              <FaRedo className="text-[10px]" /> Stack Again
            </button>
          </div>
        )}

        {isStarted && isPaused && !isGameOver && (
          <div 
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm text-center p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-3xl font-extrabold font-display tracking-tight text-cyan-405 mb-6">
              PAUSED
            </h3>
            <button
              onClick={() => setIsPaused(false)}
              className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-505 text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
            >
              <FaPlay className="text-[10px]" /> Resume
            </button>
          </div>
        )}
      </div>

      {/* BOTTOM CONSOLE BAR CONTROLS */}
      <div className="p-4 bg-white/70 border border-slate-200/80 rounded-2xl shadow-sm backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Playback action items */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={resetGame}
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

        {/* Large TAP TO PLACE button centered for touch controllers */}
        <button
          onClick={placeBlock}
          disabled={!isStarted || isGameOver || isPaused}
          className="w-full md:w-48 py-2.5 bg-cyan-600 hover:bg-cyan-700 active:scale-[0.98] disabled:opacity-40 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <FaPlay className="text-[9px] rotate-90" /> Place Slab
        </button>

        {/* Difficulty Selector */}
        <div className="flex gap-1 p-0.5 bg-slate-100/90 rounded-xl border border-slate-200/50">
          <button
            onClick={() => setDifficulty("easy")}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
              difficulty === "easy" 
                ? "bg-white text-slate-900 shadow-sm" 
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Easy
          </button>
          <button
            onClick={() => setDifficulty("medium")}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
              difficulty === "medium" 
                ? "bg-white text-slate-900 shadow-sm" 
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Medium
          </button>
          <button
            onClick={() => setDifficulty("hard")}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
              difficulty === "hard" 
                ? "bg-white text-slate-900 shadow-sm" 
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Hard
          </button>
        </div>

        {/* Sound controls details */}
        <div className="flex items-center justify-end gap-3 w-full md:w-auto">
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
