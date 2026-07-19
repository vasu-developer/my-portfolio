import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COLOR_PALETTE = [
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // amber
  "#6366f1", // indigo
  "#f43f5e", // rose
  "#8b5cf6"  // violet
];

function NodeNetwork() {
  const groupRef = useRef();
  const linesRef = useRef();
  const count = 35; // clean and minimal count

  // Generate initial node positions, random drift velocities, colors, and spins
  const nodes = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 2.0,
          (Math.random() - 0.5) * 2.0,
          (Math.random() - 0.5) * 1.2
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.03
        ),
        rotation: new THREE.Euler(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          0
        ),
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5,
          0
        ),
        color: COLOR_PALETTE[i % COLOR_PALETTE.length],
        meshRef: React.createRef()
      });
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    // 1. Move nodes and update individual cube positions/rotations
    nodes.forEach(node => {
      node.position.addScaledVector(node.velocity, delta * 3);

      // Bounce back boundary collisions
      if (Math.abs(node.position.x) > 1.1) node.velocity.x *= -1;
      if (Math.abs(node.position.y) > 1.1) node.velocity.y *= -1;
      if (Math.abs(node.position.z) > 0.8) node.velocity.z *= -1;

      // Spin the individual cubes
      node.rotation.x += node.rotSpeed.x * delta;
      node.rotation.y += node.rotSpeed.y * delta;

      // Update actual mesh reference positions/rotations directly
      if (node.meshRef.current) {
        node.meshRef.current.position.copy(node.position);
        node.meshRef.current.rotation.copy(node.rotation);
      }
    });

    // 2. Connect close nodes with thin lines
    const linePositions = [];
    const maxDistance = 0.55;

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dist = nodes[i].position.distanceTo(nodes[j].position);
        if (dist < maxDistance) {
          linePositions.push(
            nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
            nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
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

    // 3. Smooth 360-degree rotation of the entire group based on cursor position
    if (groupRef.current) {
      const targetY = state.pointer.x * Math.PI;      // 180 degrees left/right spin
      const targetX = -state.pointer.y * (Math.PI / 2); // 90 degrees up/down tilt
      
      // Interpolate for smooth visual follow
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Translucent connection segments */}
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#64748b" opacity={0.15} transparent />
      </lineSegments>

      {/* Nodes / Individual Colorful 3D Cubes */}
      {nodes.map((node, i) => (
        <mesh key={i} ref={node.meshRef}>
          {/* Square/cube shape */}
          <boxGeometry args={[0.045, 0.045, 0.045]} />
          <meshBasicMaterial color={node.color} />
        </mesh>
      ))}
    </group>
  );
}

export default function ThreeDScene() {
  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[450px] relative flex items-center justify-center select-none">
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-blue-600/10 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      }>
        <Canvas camera={{ position: [0, 0, 1.6] }} className="w-full h-full">
          <ambientLight intensity={0.8} />
          <NodeNetwork />
        </Canvas>
      </Suspense>
    </div>
  );
}
