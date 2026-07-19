import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { playLinkConnect, playLinkBurst, playZenPop } from "./AudioSynth";
import { FaPlay, FaPause, FaRedo, FaVolumeMute, FaVolumeUp, FaLink } from "react-icons/fa";

// Constants
const V_BOUNDS = { x: 5.2, y: 3.5, z: 1.5 };
const INITIAL_NODES_COUNT = 36;
const COLOR_PALETTE = [
  { hex: "#ec4899", name: "pink" },
  { hex: "#06b6d4", name: "cyan" },
  { hex: "#8b5cf6", name: "purple" },
  { hex: "#10b981", name: "emerald" },
  { hex: "#f59e0b", name: "amber" }
];

const LINKER_DIFFICULTY = {
  easy: { threshold: 2.05, speed: 0.5 },
  medium: { threshold: 1.70, speed: 0.8 },
  hard: { threshold: 1.35, speed: 1.3 }
};

// Sparkle particles for chain bursts
function BurstParticles({ particles }) {
  return (
    <group>
      {particles.map((p) => (
        <mesh key={p.id} position={p.pos}>
          <sphereGeometry args={[p.size, 6, 6]} />
          <meshBasicMaterial color={p.color} transparent opacity={p.opacity} />
        </mesh>
      ))}
    </group>
  );
}

// Active connection lasers
function ChainLaser({ activeChain, nodes }) {
  const lineRef = useRef();

  useFrame(() => {
    if (!lineRef.current) return;
    
    const positions = [];
    activeChain.forEach(nodeId => {
      const node = nodes.find(n => n.id === nodeId);
      if (node) {
        positions.push(node.pos.x, node.pos.y, node.pos.z);
      }
    });

    if (positions.length > 0) {
      lineRef.current.geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(positions), 3)
      );
      lineRef.current.geometry.attributes.position.needsUpdate = true;
    } else {
      lineRef.current.geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array([]), 3)
      );
    }
  });

  if (activeChain.length < 2) return null;

  return (
    <line ref={lineRef}>
      <bufferGeometry />
      <lineBasicMaterial 
        color="#ffffff" 
        linewidth={3} 
        transparent 
        opacity={0.85} 
      />
    </line>
  );
}

// Simulated Sandbox Nodes
function NodeSandbox({ 
  isStarted, isPaused, isGameOver, isMuted,
  activeChain, setActiveChain, chainColor, setChainColor,
  onClearChain, spawnParticles, score, setScore, resetTrigger,
  difficulty
}) {
  const { pointer, viewport } = useThree();
  const config = LINKER_DIFFICULTY[difficulty] || LINKER_DIFFICULTY.medium;
  const indexRef = useRef(0);
  const nodesRef = useRef([]);
  const linesRef = useRef();
  
  // Track dragging state
  const isDragging = useRef(false);

  // Initialize node cloud
  const initializeNodes = (count) => {
    const list = [];
    for (let i = 0; i < count; i++) {
      indexRef.current++;
      const colorObj = COLOR_PALETTE[i % COLOR_PALETTE.length];
      list.push({
        id: indexRef.current,
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * V_BOUNDS.x * 1.5,
          (Math.random() - 0.5) * V_BOUNDS.y * 1.5,
          (Math.random() - 0.5) * V_BOUNDS.z * 1.2
        ),
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.4
        ),
        color: colorObj.hex,
        size: 0.16,
        meshRef: React.createRef()
      });
    }
    nodesRef.current = list;
  };

  // Reset triggers
  useEffect(() => {
    initializeNodes(INITIAL_NODES_COUNT);
    setActiveChain([]);
    isDragging.current = false;
  }, [resetTrigger]);

  // Handle global mouse release
  useEffect(() => {
    const handlePointerUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      
      const chain = [...activeChain];
      if (chain.length >= 3) {
        // Clear chain!
        if (!isMuted) playLinkBurst();

        // 1. Trigger sparkle explosions
        const sparks = [];
        chain.forEach(nodeId => {
          const node = nodesRef.current.find(n => n.id === nodeId);
          if (node) {
            for (let i = 0; i < 8; i++) {
              sparks.push({
                id: Math.random() + Date.now(),
                pos: node.pos.clone(),
                vel: new THREE.Vector3(
                  (Math.random() - 0.5) * 3.0,
                  (Math.random() - 0.5) * 3.0 + 1.2, // upward pop
                  (Math.random() - 0.5) * 1.5
                ),
                color: node.color,
                size: 0.05,
                opacity: 1.0
              });
            }
          }
        });
        spawnParticles(sparks);

        // 2. Add score points
        setScore(s => s + chain.length * 10);

        // 3. Remove cleared nodes
        nodesRef.current = nodesRef.current.filter(n => !chain.includes(n.id));

        // 4. Spawn replacement nodes at the top
        const refillCount = chain.length;
        for (let i = 0; i < refillCount; i++) {
          indexRef.current++;
          const colorObj = COLOR_PALETTE[indexRef.current % COLOR_PALETTE.length];
          nodesRef.current.push({
            id: indexRef.current,
            pos: new THREE.Vector3(
              (Math.random() - 0.5) * V_BOUNDS.x * 1.4,
              V_BOUNDS.y + 0.8 + (i * 0.4), // stack at the top
              (Math.random() - 0.5) * V_BOUNDS.z
            ),
            vel: new THREE.Vector3(
              (Math.random() - 0.5) * 0.2,
              -1.2 - Math.random() * 0.5, // float downwards
              (Math.random() - 0.5) * 0.2
            ),
            color: colorObj.hex,
            size: 0.16,
            meshRef: React.createRef()
          });
        }
      } else {
        // Pop release chime on abort
        if (chain.length > 0 && !isMuted) playZenPop();
      }

      setActiveChain([]);
      setChainColor(null);
    };

    window.addEventListener("pointerup", handlePointerUp);
    return () => window.removeEventListener("pointerup", handlePointerUp);
  }, [activeChain, isMuted]);

  // Click on a node to begin the drag chain
  const handleNodeDown = (node, e) => {
    e.stopPropagation();
    if (!isStarted || isPaused || isGameOver) return;
    
    isDragging.current = true;
    setChainColor(node.color);
    setActiveChain([node.id]);
    
    if (!isMuted) playLinkConnect(0);
  };

  // Hover over a node to extend chain
  const handleNodeOver = (node, e) => {
    e.stopPropagation();
    if (!isStarted || isPaused || isGameOver || !isDragging.current) return;
    
    // 1. Color check
    if (node.color !== chainColor) return;
    
    // 2. Already in chain check
    if (activeChain.includes(node.id)) {
      // Allow backtracking to previous node to undo mistakes
      if (activeChain.length >= 2 && activeChain[activeChain.length - 2] === node.id) {
        setActiveChain(prev => prev.slice(0, -1));
        if (!isMuted) playLinkConnect(activeChain.length - 2);
      }
      return;
    }

    // 3. Proximity distance check (neighbor nodes only)
    const lastNodeId = activeChain[activeChain.length - 1];
    const lastNode = nodesRef.current.find(n => n.id === lastNodeId);
    if (!lastNode) return;
    
    const dist = lastNode.pos.distanceTo(node.pos);
    if (dist < config.threshold) {
      setActiveChain(prev => [...prev, node.id]);
      if (!isMuted) playLinkConnect(activeChain.length);
    }
  };

  useFrame((state, delta) => {
    const nodes = nodesRef.current;

    // 1. Proximity touch drag check for mobile screens
    if (isDragging.current && isStarted && !isPaused && !isGameOver) {
      const targetX = state.pointer.x * state.viewport.width / 2;
      const targetY = state.pointer.y * state.viewport.height / 2;
      const pointerPos = new THREE.Vector3(targetX, targetY, 0);

      nodes.forEach(node => {
        if (node.color === chainColor && !activeChain.includes(node.id)) {
          const distToPointer = node.pos.distanceTo(pointerPos);
          if (distToPointer < 0.45) { // collision radius
            const lastNodeId = activeChain[activeChain.length - 1];
            const lastNode = nodes.find(n => n.id === lastNodeId);
            if (lastNode) {
              const distToLastNode = lastNode.pos.distanceTo(node.pos);
              if (distToLastNode < config.threshold) {
                setActiveChain(prev => [...prev, node.id]);
                if (!isMuted) playLinkConnect(activeChain.length);
              }
            }
          }
        }
      });
    }

    // 2. Float nodes smoothly in space
    nodes.forEach(node => {
      // Low friction drag
      node.vel.multiplyScalar(0.99);

      // Bounce off boundaries softly
      if (Math.abs(node.pos.x) > V_BOUNDS.x) {
        node.pos.x = Math.sign(node.pos.x) * V_BOUNDS.x;
        node.vel.x *= -0.9;
      }
      if (node.pos.y < -V_BOUNDS.y) {
        node.pos.y = -V_BOUNDS.y;
        node.vel.y *= -0.9;
      }
      // Top boundary has elastic bounce for falling replacements
      if (node.pos.y > V_BOUNDS.y + 0.4) {
        node.vel.y -= 0.6 * delta; // slight gravity pull down at the top ceiling
      }
      if (Math.abs(node.pos.z) > V_BOUNDS.z) {
        node.pos.z = Math.sign(node.pos.z) * V_BOUNDS.z;
        node.vel.z *= -0.9;
      }

      // Continuous light random drift forces
      node.vel.x += (Math.random() - 0.5) * 0.08 * delta * config.speed;
      node.vel.y += (Math.random() - 0.5) * 0.08 * delta * config.speed;

      // Update positions
      node.pos.addScaledVector(node.vel, delta * 3.5 * config.speed);

      // Render positions on 3D meshes
      if (node.meshRef.current) {
        node.meshRef.current.position.copy(node.pos);
        
        // Visual pulses if selected in active chain
        const isLinked = activeChain.includes(node.id);
        const scaleVal = isLinked 
          ? 1.25 + Math.sin(state.clock.getElapsedTime() * 12) * 0.12 
          : 1.0;
        node.meshRef.current.scale.setScalar(scaleVal);
      }
    });

    // 3. Draw background structural constellation mesh links
    const linePositions = [];
    const linkDistThreshold = config.threshold;
    const count = nodes.length;

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        // Skip links that are in active chain drawing to avoid overlapping lines
        const idA = nodes[i].id;
        const idB = nodes[j].id;
        const linkedIndexA = activeChain.indexOf(idA);
        const linkedIndexB = activeChain.indexOf(idB);
        if (linkedIndexA !== -1 && linkedIndexB !== -1 && Math.abs(linkedIndexA - linkedIndexB) === 1) {
          continue;
        }

        const dist = nodes[i].pos.distanceTo(nodes[j].pos);
        if (dist < linkDistThreshold) {
          linePositions.push(
            nodes[i].pos.x, nodes[i].pos.y, nodes[i].pos.z,
            nodes[j].pos.x, nodes[j].pos.y, nodes[j].pos.z
          );
        }
      }
    }

    if (linesRef.current) {
      linesRef.current.geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(linePositions), 3)
      );
      linesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Background constellation lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial 
          color="#334155" 
          opacity={0.3} 
          transparent 
        />
      </lineSegments>

      {/* Active chain laser paths */}
      <ChainLaser activeChain={activeChain} nodes={nodesRef.current} />

      {/* Node Render components */}
      {nodesRef.current.map(node => (
        <mesh
          key={node.id}
          ref={node.meshRef}
          onPointerDown={(e) => handleNodeDown(node, e)}
          onPointerOver={(e) => handleNodeOver(node, e)}
          className="cursor-pointer"
        >
          <sphereGeometry args={[node.size, 16, 16]} />
          {/* Neon emission standard materials */}
          <meshStandardMaterial 
            color={node.color}
            emissive={node.color}
            emissiveIntensity={activeChain.includes(node.id) ? 1.4 : 0.4}
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ConstellationLinker() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("portfolio_link_highscore_3d");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  // Game connections parameters
  const [activeChain, setActiveChain] = useState([]);
  const [chainColor, setChainColor] = useState(null);
  const [difficulty, setDifficulty] = useState("medium"); // 'easy', 'medium', or 'hard'
  
  const [particles, setParticles] = useState([]);
  const [resetTrigger, setResetTrigger] = useState(0);

  // Sync high scores
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("portfolio_link_highscore_3d", score.toString());
    }
  }, [score, highScore]);

  // Particle updates loop
  useEffect(() => {
    if (particles.length === 0) return;

    let frameId;
    const animateParticles = () => {
      setParticles(prev => 
        prev.map(p => {
          const nextVelY = p.vel.y - 0.15; // gravity pulls down
          return {
            ...p,
            pos: p.pos.clone().addScaledVector(p.vel, 0.05),
            vel: new THREE.Vector3(p.vel.x, nextVelY, p.vel.z),
            opacity: p.opacity - 0.035,
            size: p.size * 0.96
          };
        }).filter(p => p.opacity > 0)
      );
      frameId = requestAnimationFrame(animateParticles);
    };

    frameId = requestAnimationFrame(animateParticles);
    return () => cancelAnimationFrame(frameId);
  }, [particles]);

  const handleSpawnParticles = (sparks) => {
    setParticles(prev => [...prev, ...sparks]);
  };

  const handleReset = () => {
    setScore(0);
    setActiveChain([]);
    setChainColor(null);
    setIsPaused(false);
    setResetTrigger(prev => prev + 1);
    setIsStarted(true);
  };

  return (
    <div className="flex flex-col gap-4 w-full select-none">
      
      {/* HUD stats header (In normal flow above the screen, never covering balls) */}
      <div className="px-5 py-3.5 bg-white/70 border border-slate-200/80 rounded-2xl shadow-sm backdrop-blur-md flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[9px] tracking-wider text-slate-450 uppercase font-semibold">Zen Score</span>
            <span className="text-base font-bold font-mono text-violet-500">{score}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] tracking-wider text-slate-450 uppercase font-semibold">Best Record</span>
            <span className="text-xs font-semibold font-mono text-slate-500">{highScore}</span>
          </div>
        </div>

        {/* Active Chain Count display */}
        {activeChain.length > 0 ? (
          <div className="px-3 py-1 rounded-lg bg-violet-50 border border-violet-100 text-violet-600 font-mono text-xs font-bold animate-pulse flex items-center gap-1.5 shadow-sm">
            <FaLink className="text-[10px]" style={{ color: chainColor }} />
            LINKING: {activeChain.length}
          </div>
        ) : (
          <span className="text-[9px] text-slate-450 font-bold uppercase tracking-widest font-mono bg-slate-100 border border-slate-200/50 px-2 py-0.5 rounded">
            Linker
          </span>
        )}
      </div>

      {/* 3D GRAPHICS SCENE VIEWPORT */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-slate-950 border border-slate-700/60 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center">
        
        {/* R3F Canvas */}
        <div className="w-full h-full">
          <Canvas camera={{ position: [0, 0, 7.5], fov: 60 }} gl={{ antialias: true }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[0, 4, 3]} intensity={0.8} color="#ffffff" />
            <pointLight position={[0, -4, 2]} intensity={0.4} color="#38bdf8" />
            
            <NodeSandbox 
              isStarted={isStarted}
              isPaused={isPaused}
              isGameOver={false}
              isMuted={isMuted}
              activeChain={activeChain}
              setActiveChain={setActiveChain}
              chainColor={chainColor}
              setChainColor={setChainColor}
              spawnParticles={handleSpawnParticles}
              score={score}
              setScore={setScore}
              resetTrigger={resetTrigger}
              difficulty={difficulty}
            />

            {/* Clear explosions sparkles */}
            <BurstParticles particles={particles} />
          </Canvas>
        </div>

        {/* Ambient instructions guide */}
        {isStarted && !isPaused && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-slate-950/70 border border-slate-800/80 rounded-full text-[9px] font-sans text-slate-400 font-bold tracking-wider text-center pointer-events-none uppercase">
            Click & drag across matching colors • Link 3+ to burst chimes
          </div>
        )}

        {/* Menu panels overlays */}
        {!isStarted && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/90 text-center p-6 animate-fadeIn">
            <h3 className="text-2xl font-bold font-display tracking-tight text-white mb-2 flex items-center gap-2">
              <FaLink className="text-violet-500 text-lg" /> 3D Constellation Linker
            </h3>
            <p className="text-xs text-slate-400 max-w-[280px] mb-6 leading-relaxed">
              Match colorful nodes in floating space. Click and drag to connect neighboring nodes of the same color, creating musical chimes!
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-gradient-to-r from-violet-650 to-indigo-600 hover:from-violet-550 hover:to-indigo-500 text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-violet-500/25 flex items-center gap-2 cursor-pointer"
            >
              <FaPlay className="text-[10px]" /> Play Constellations
            </button>
          </div>
        )}

        {isStarted && isPaused && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm text-center p-6">
            <h3 className="text-3xl font-extrabold font-display tracking-tight text-violet-405 mb-6">
              PAUSED
            </h3>
            <button
              onClick={() => setIsPaused(false)}
              className="px-6 py-2.5 bg-violet-600 hover:bg-violet-505 text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-violet-500/20 flex items-center gap-2 cursor-pointer"
            >
              <FaPlay className="text-[10px]" /> Resume
            </button>
          </div>
        )}
      </div>

      {/* BOTTOM CONSOLE BAR CONTROLS */}
      <div className="p-4 bg-white/70 border border-slate-200/80 rounded-2xl shadow-sm backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Play actions */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={handleReset}
            className="flex-1 md:flex-none px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          >
            <FaRedo className="text-[9px]" /> Restart Game
          </button>
          <button
            onClick={() => {
              if (isStarted) {
                setIsPaused(!isPaused);
              }
            }}
            disabled={!isStarted}
            className="flex-1 md:flex-none px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          >
            {isPaused ? <FaPlay className="text-[9px]" /> : <FaPause className="text-[9px]" />}
            {isPaused ? "Resume" : "Pause"}
          </button>
        </div>

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

        {/* Audio Muting toggle */}
        <div className="flex items-center justify-end gap-3 w-full md:w-auto">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 bg-slate-100 hover:bg-slate-200 active:scale-95 rounded-xl text-slate-655 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm text-xs font-semibold"
          >
            {isMuted ? <FaVolumeMute className="text-rose-500" /> : <FaVolumeUp className="text-emerald-500" />}
            {isMuted ? "Mute" : "Sound"}
          </button>
        </div>

      </div>

    </div>
  );
}
