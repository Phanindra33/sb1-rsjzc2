import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useMousePosition } from '../hooks/useMousePosition';
import * as THREE from 'three';

function Robot() {
  const mousePosition = useMousePosition();
  const robotRef = useRef<THREE.Group>();
  const headRef = useRef<THREE.Mesh>();
  const eyesGroupRef = useRef<THREE.Group>();

  useFrame((state, delta) => {
    if (robotRef.current && headRef.current && eyesGroupRef.current) {
      // Smooth body rotation
      robotRef.current.rotation.y = THREE.MathUtils.lerp(
        robotRef.current.rotation.y,
        mousePosition.x * Math.PI * 0.5,
        0.05
      );
      robotRef.current.rotation.x = THREE.MathUtils.lerp(
        robotRef.current.rotation.x,
        mousePosition.y * Math.PI * 0.15,
        0.05
      );

      // Head follows mouse more quickly
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        mousePosition.x * Math.PI * 0.3,
        0.1
      );

      // Eyes glow intensity based on movement
      const movement = Math.abs(mousePosition.x) + Math.abs(mousePosition.y);
      eyesGroupRef.current.children.forEach((eye) => {
        if (eye instanceof THREE.Mesh) {
          (eye.material as THREE.MeshStandardMaterial).emissiveIntensity = 
            2 + movement * 2;
        }
      });
    }
  });

  return (
    <group ref={robotRef}>
      {/* Head */}
      <mesh ref={headRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#4F46E5"
          emissive="#2563EB"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Neck */}
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.5]} />
        <meshStandardMaterial
          color="#3730A3"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Body */}
      <group position={[0, -2.5, 0]}>
        {/* Torso */}
        <mesh>
          <cylinderGeometry args={[0.8, 1.2, 2]} />
          <meshStandardMaterial
            color="#1E40AF"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Chest Light */}
        <mesh position={[0, 0.5, 0.6]}>
          <circleGeometry args={[0.2]} />
          <meshStandardMaterial
            color="#60A5FA"
            emissive="#60A5FA"
            emissiveIntensity={1}
          />
        </mesh>
      </group>

      {/* Eyes Group */}
      <group ref={eyesGroupRef} position={[0, 0.2, 0.8]}>
        {/* Left Eye */}
        <mesh position={[-0.3, 0, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color="#60A5FA"
            emissive="#60A5FA"
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>
        {/* Right Eye */}
        <mesh position={[0.3, 0, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color="#60A5FA"
            emissive="#60A5FA"
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Shoulder Pads */}
      <group position={[0, -1.8, 0]}>
        <mesh position={[-1, 0, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial
            color="#3730A3"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        <mesh position={[1, 0, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial
            color="#3730A3"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
}

export default function RobotScene() {
  return (
    <div className="h-full w-full relative z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <spotLight
          position={[0, 10, 0]}
          intensity={0.8}
          angle={0.5}
          penumbra={1}
        />
        <Robot />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}