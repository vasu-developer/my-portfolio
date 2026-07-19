import React, { useState, useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { playZenChime, playZenPop } from "./AudioSynth";
import { FaWind, FaMagnet, FaVolumeMute, FaVolumeUp, FaTrashAlt, FaUndo } from "react-icons/fa";

// Constants
const MAX_NODES = 80;
const INITIAL_NODES_COUNT = 30;
const BOUNDS = { x: 5.2, y: 3.5, z: 1.8 };
const COLOR_PALETTE = [
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // amber
  "#6366f1", // indigo
  "#f43f5e", // rose
  "#8b5cf6", // violet
  "#06b6d4", // cyan
  "#ec4899"  // pink
];

// Individual Pop Particle helper component
function PopParticles({ particles }) {
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

// Simulated Sandbox Nodes and Connections
function GravitySandbox({ 
  initialCount, gravityMode, gravityStrength, isMuted,
  addSoundCount, clearTrigger, resetTrigger, onSpawnNode,
  spawnParticles
}) {
  const { viewport, pointer } = useThree();
  const groupRef = useRef();
  const linesRef = useRef();
  const indexRef = useRef(0);
  
  // Track node simulation list in ref for 60fps performance
  const nodesRef = useRef([]);

  // Setup nodes based on count
  const initializeNodes = (count) => {
    const list = [];
    for (let i = 0; i < count; i++) {
      indexRef.current++;
      list.push({
        id: indexRef.current,
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * BOUNDS.x * 1.5,
          (Math.random() - 0.5) * BOUNDS.y * 1.5,
          (Math.random() - 0.5) * BOUNDS.z * 1.5
        ),
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 0.8
        ),
        color: COLOR_PALETTE[i % COLOR_PALETTE.length],
        size: Math.random() * 0.08 + 0.07,
        meshRef: React.createRef()
      });
    }
    nodesRef.current = list;
  };

  // Run initial nodes setup
  useEffect(() => {
    initializeNodes(INITIAL_NODES_COUNT);
  }, []);

  // Listen to outer clears/resets
  useEffect(() => {
    if (clearTrigger > 0) {
      nodesRef.current = [];
    }
  }, [clearTrigger]);

  useEffect(() => {
    if (resetTrigger > 0) {
      initializeNodes(INITIAL_NODES_COUNT);
    }
  }, [resetTrigger]);

  // Expose node spawning coordinate callback
  useEffect(() => {
    onSpawnNode.current = (x, y, z) => {
      if (nodesRef.current.length >= MAX_NODES) return;
      
      indexRef.current++;
      const color = COLOR_PALETTE[indexRef.current % COLOR_PALETTE.length];
      
      nodesRef.current.push({
        id: indexRef.current,
        pos: new THREE.Vector3(x, y, z),
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5
        ),
        color: color,
        size: Math.random() * 0.08 + 0.07,
        meshRef: React.createRef()
      });
    };
  }, [onSpawnNode]);

  // Pop node trigger
  const handleNodeClick = (node, e) => {
    e.stopPropagation();
    
    // Play Pop sound
    if (!isMuted) playZenPop();

    // Spawn tiny explosion sparks
    const sparks = [];
    for (let i = 0; i < 10; i++) {
      sparks.push({
        id: Math.random() + Date.now(),
        pos: node.pos.clone(),
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 4.0,
          (Math.random() - 0.5) * 4.0,
          (Math.random() - 0.5) * 4.0
        ),
        color: node.color,
        size: node.size * 0.4,
        opacity: 1.0
      });
    }
    spawnParticles(sparks);

    // Remove node
    nodesRef.current = nodesRef.current.filter((n) => n.id !== node.id);
  };

  useFrame((state, delta) => {
    const nodes = nodesRef.current;
    
    // Scale pointer to viewport boundaries
    const targetX = pointer.x * viewport.width / 2;
    const targetY = pointer.y * viewport.height / 2;
    const attractor = new THREE.Vector3(targetX, targetY, 0);

    // 1. Particle Simulation
    nodes.forEach((node) => {
      // Damping friction (smooth deceleration like swimming in oil/water)
      node.vel.multiplyScalar(0.985);

      // Mouse gravity field
      const toAttractor = new THREE.Vector3().subVectors(attractor, node.pos);
      const dist = toAttractor.length();
      
      // Affect nodes within 5 units
      if (dist < 5.0 && dist > 0.05) {
        const forceDir = toAttractor.normalize();
        
        // Inverse proportional gravity force
        const forceMagnitude = (gravityStrength * 1.5) / (dist * dist + 0.6);
        
        if (gravityMode === "attract") {
          node.vel.addScaledVector(forceDir, forceMagnitude * delta);
        } else {
          // Repel wind pushes out faster
          node.vel.addScaledVector(forceDir, -forceMagnitude * 1.6 * delta);
        }
      }

      // Add small continuous noise drift
      node.vel.x += (Math.random() - 0.5) * 0.05 * delta;
      node.vel.y += (Math.random() - 0.5) * 0.05 * delta;
      
      // Update coordinates
      node.pos.addScaledVector(node.vel, delta * 8.5);

      // Boundary Collisions (Elastic Bounces)
      if (Math.abs(node.pos.x) > BOUNDS.x) {
        node.pos.x = Math.sign(node.pos.x) * BOUNDS.x;
        node.vel.x *= -0.85;
      }
      if (Math.abs(node.pos.y) > BOUNDS.y) {
        node.pos.y = Math.sign(node.pos.y) * BOUNDS.y;
        node.vel.y *= -0.85;
      }
      if (Math.abs(node.pos.z) > BOUNDS.z) {
        node.pos.z = Math.sign(node.pos.z) * BOUNDS.z;
        node.vel.z *= -0.85;
      }

      // Apply coordinates directly to WebGL meshes
      if (node.meshRef.current) {
        node.meshRef.current.position.copy(node.pos);
      }
    });

    // 2. Compute Connection lines
    const linePositions = [];
    const maxLinkDist = 1.65;
    const count = nodes.length;

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const d = nodes[i].pos.distanceTo(nodes[j].pos);
        if (d < maxLinkDist) {
          linePositions.push(
            nodes[i].pos.x, nodes[i].pos.y, nodes[i].pos.z,
            nodes[j].pos.x, nodes[j].pos.y, nodes[j].pos.z
          );
        }
      }
    }

    // Apply vertices to bufferGeometry for connected links
    if (linesRef.current) {
      linesRef.current.geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(linePositions), 3)
      );
      linesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Glow connections */}
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial 
          color="#38bdf8" 
          opacity={0.35} 
          transparent 
          linewidth={1.5}
        />
      </lineSegments>

      {/* Nodes Render meshes */}
      {nodesRef.current.map((node) => (
        <mesh 
          key={node.id} 
          ref={node.meshRef}
          onPointerDown={(e) => handleNodeClick(node, e)}
          className="cursor-pointer"
        >
          <sphereGeometry args={[node.size, 16, 16]} />
          <meshStandardMaterial 
            color={node.color} 
            emissive={node.color} 
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

// Background click target plate
function ClickPlane({ onClick }) {
  const { viewport } = useThree();
  return (
    <mesh 
      onPointerDown={(e) => onClick(e.point)}
      position={[0, 0, -0.5]}
    >
      <planeGeometry args={[viewport.width * 1.5, viewport.height * 1.5]} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>
  );
}
export default function ZenGame() {
  const [gravityMode, setGravityMode] = useState("attract"); // attract or repel
  const [difficulty, setDifficulty] = useState("medium"); // 'easy', 'medium', or 'hard'
  const gravityStrength = difficulty === "easy" ? 0.45 : difficulty === "medium" ? 1.05 : 1.85;
  const [isMuted, setIsMuted] = useState(false);
  const [clearTrigger, setClearTrigger] = useState(0);
  const [resetTrigger, setResetTrigger] = useState(0);
  
  const [soundCount, setSoundCount] = useState(0);
  const [particles, setParticles] = useState([]);
  
  // Ref triggers passed to Canvas sandbox loop
  const spawnNodeCallbackRef = useRef(null);

  // Animate popped debris particles in React frame loop
  useEffect(() => {
    if (particles.length === 0) return;

    let frameId;
    const updateParticles = () => {
      setParticles((prev) => 
        prev.map((p) => {
          const nextVelY = p.vel.y - 0.16; // gravity
          return {
            ...p,
            pos: p.pos.clone().addScaledVector(p.vel, 0.05),
            vel: new THREE.Vector3(p.vel.x, nextVelY, p.vel.z),
            opacity: p.opacity - 0.025,
            size: p.size * 0.97
          };
        }).filter((p) => p.opacity > 0)
      );
      frameId = requestAnimationFrame(updateParticles);
    };

    frameId = requestAnimationFrame(updateParticles);
    return () => cancelAnimationFrame(frameId);
  }, [particles]);

  const addSoundCountIncrement = () => {
    setSoundCount(prev => prev + 1);
  };

  const handleCanvasClick = (point) => {
    // 1. Play Hirajoshi chime tone
    if (!isMuted) {
      playZenChime(soundCount);
      addSoundCountIncrement();
    }
    
    // 2. Trigger node creation at clicked coordinate
    if (spawnNodeCallbackRef.current) {
      spawnNodeCallbackRef.current(point.x, point.y, point.z);
    }
  };

  const spawnParticlesCallback = (sparks) => {
    setParticles(prev => [...prev, ...sparks]);
  };

  return (
    <div className="flex flex-col gap-4 w-full select-none">
      
      {/* HUD stats header (In normal flow above the screen, never covering game screen) */}
      <div className="px-5 py-3.5 bg-white/70 border border-slate-200/80 rounded-2xl shadow-sm backdrop-blur-md flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[9px] tracking-wider text-slate-450 uppercase font-semibold">Zen mode</span>
          <span className="text-xs font-bold font-sans text-cyan-600">Attuning Chimes</span>
        </div>
        
        <span className="text-[9px] text-slate-455 font-bold uppercase tracking-widest font-mono bg-slate-100 border border-slate-200/50 px-2.5 py-1 rounded-lg">
          Gravity Sandbox
        </span>
      </div>

      {/* 3D WEBGL GRAPHICS SCREEN */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-slate-950 border border-slate-700/60 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center cursor-crosshair">
        
        <div className="w-full h-full">
          <Canvas camera={{ position: [0, 0, 7.5], fov: 60 }} gl={{ antialias: true }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[0, 0, 5]} intensity={0.5} />
            <pointLight position={[0, 3, 2]} intensity={0.6} color="#38bdf8" />
            
            {/* Main simulation group */}
            <GravitySandbox 
              initialCount={INITIAL_NODES_COUNT}
              gravityMode={gravityMode}
              gravityStrength={gravityStrength}
              isMuted={isMuted}
              addSoundCount={addSoundCountIncrement}
              clearTrigger={clearTrigger}
              resetTrigger={resetTrigger}
              onSpawnNode={spawnNodeCallbackRef}
              spawnParticles={spawnParticlesCallback}
            />

            {/* Popped glowing particle dots */}
            <PopParticles particles={particles} />

            {/* Behind nodes click plate */}
            <ClickPlane onClick={handleCanvasClick} />
          </Canvas>
        </div>

        {/* Ambient HUD text instructions overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-slate-950/70 border border-slate-800/80 rounded-full text-[9px] font-sans text-slate-400 font-bold tracking-wider text-center pointer-events-none uppercase">
          Click Background: Add Node & Sound Chime • Click Node: Pop Bubble
        </div>
      </div>

      {/* BOTTOM CONSOLE BAR CONTROLS */}
      <div className="p-4 bg-white/70 border border-slate-200/80 rounded-2xl shadow-sm backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Toggle Magnet / Repeller force */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setGravityMode(gravityMode === "attract" ? "repel" : "attract")}
            className="flex-1 md:flex-none px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            {gravityMode === "attract" ? (
              <>
                <FaMagnet className="text-cyan-400 text-[11px]" />
                Magnet Attract
              </>
            ) : (
              <>
                <FaWind className="text-emerald-400 text-[11px] animate-pulse" />
                Wind Repel
              </>
            )}
          </button>

          {/* Reset / Clear Buttons */}
          <button
            onClick={() => setClearTrigger(c => c + 1)}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            title="Remove All Nodes"
          >
            <FaTrashAlt className="text-slate-500 text-[10px]" /> Clear
          </button>
          
          <button
            onClick={() => setResetTrigger(r => r + 1)}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            title="Reset to 30 Nodes"
          >
            <FaUndo className="text-slate-500 text-[10px]" /> Reset
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

        {/* Audio Muter details */}
        <div className="flex items-center justify-end gap-3 w-full md:w-auto">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 bg-slate-100 hover:bg-slate-200 active:scale-95 rounded-xl text-slate-650 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm text-xs font-semibold"
          >
            {isMuted ? <FaVolumeMute className="text-rose-500" /> : <FaVolumeUp className="text-emerald-500" />}
            {isMuted ? "Mute" : "Sound"}
          </button>
        </div>

      </div>

    </div>
  );
}
