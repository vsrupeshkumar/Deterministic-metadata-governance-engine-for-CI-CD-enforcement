'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, Points, PointMaterial, Line, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface NodeData {
  id: string;
  name: string;
  pos: [number, number, number];
  impact: number;
}

interface EdgeData {
  start: [number, number, number];
  end: [number, number, number];
}

function GraphScene({ nodes, edges, onSelectNode }: { nodes: NodeData[], edges: EdgeData[], onSelectNode?: (n: NodeData) => void }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node) => (
        <Float key={node.id} speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh 
            position={node.pos} 
            onClick={(e) => {
              e.stopPropagation();
              onSelectNode?.(node);
            }}
            onPointerOver={() => { document.body.style.cursor = 'pointer' }}
            onPointerOut={() => { document.body.style.cursor = 'auto' }}
          >
            <sphereGeometry args={[0.1 + node.impact * 0.08, 24, 24]} />
            <meshStandardMaterial 
              color={node.impact > 0.5 ? "#ff5b5b" : "#00f0ff"} 
              emissive={node.impact > 0.5 ? "#ff5b5b" : "#00f0ff"}
              emissiveIntensity={1.5}
              roughness={0}
              metalness={1}
            />
          </mesh>
          <Text
            position={[node.pos[0], node.pos[1] + 0.3, node.pos[2]]}
            fontSize={0.08}
            color="white"
            anchorX="center"
            anchorY="middle"
            font="/fonts/SpaceGrotesk-Bold.ttf" // Optional: placeholder for custom font
          >
            {node.name}
          </Text>
        </Float>
      ))}
      
      {edges.map((edge, i) => (
        <Line
          key={i}
          points={[edge.start, edge.end]}
          color="#00f0ff"
          lineWidth={1}
          transparent
          opacity={0.15}
        />
      ))}

      {/* Background Cosmic Dust */}
      <Points limit={2000}>
        <PointMaterial 
          transparent 
          vertexColors 
          size={0.03} 
          sizeAttenuation={true} 
          depthWrite={false} 
        />
        {useMemo(() => {
          const positions = new Float32Array(2000 * 3);
          for (let i = 0; i < 2000; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
          }
          return positions;
        }, [])}
      </Points>
    </group>
  );
}

export const BlastRadius3D: React.FC<{ data?: any }> = ({ data }) => {
  const nodes = useMemo(() => {
    // Dynamically scale or use backend provided nodes
    const mockNodes: NodeData[] = [
      { id: '1', name: 'CORE_USERS', pos: [0, 0, 0], impact: 0.9 },
      { id: '2', name: 'BILLING_DATA', pos: [1.2, 1, -1.5], impact: 0.6 },
      { id: '3', name: 'INV_CATALOG', pos: [-1.5, 0.8, 1.2], impact: 0.3 },
      { id: '4', name: 'AUTH_TRAIL', pos: [0.8, -1.2, 0.8], impact: 0.7 },
      { id: '5', name: 'AUDIT_LOG_V2', pos: [-1.8, -1, -0.8], impact: 0.1 },
      { id: '6', name: 'GEO_SHARDS', pos: [2, 0, 1], impact: 0.4 },
    ];
    return mockNodes;
  }, [data]);

  const edges = useMemo(() => {
    const mockEdges: EdgeData[] = [];
    nodes.forEach((node, i) => {
      if (i > 0) {
        mockEdges.push({ start: nodes[0].pos, end: node.pos });
      }
    });
    return mockEdges;
  }, [nodes]);

  return (
    <div className="w-full h-full min-h-[350px] relative">
      <Canvas gl={{ antialias: true }} dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <GraphScene 
           nodes={nodes} 
           edges={edges} 
           onSelectNode={(n) => alert(`ENT_METADATA: ${n.name}\nIMPACT_RADIUS: ${n.impact * 100}%`)} 
        />
      </Canvas>
    </div>
  );
};
