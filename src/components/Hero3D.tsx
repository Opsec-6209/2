import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function FloatingParticles({ count = 200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const [positions, sizes, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    const col = new Float32Array(count * 3);
    const palette = [
      [0, 1, 0.53],
      [1, 0, 0.5],
      [0, 0.87, 1],
      [0.67, 0.53, 1],
    ];
    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) - 2;
      pos[i * 3 + 2] = r * Math.cos(phi);
      siz[i] = Math.random() * 0.04 + 0.01;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c[0];
      col[i * 3 + 1] = c[1];
      col[i * 3 + 2] = c[2];
    }
    return [pos, siz, col];
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.05;
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.003;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function MebiousCore() {
  const ref = useRef<THREE.Group>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.3;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.5;
      wireRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group ref={ref}>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.4, 0]} />
        <meshBasicMaterial
          color="#00ff88"
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.0, 0]} />
        <meshBasicMaterial
          color="#00ff88"
          transparent
          opacity={0.15}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.5, 0]} />
        <meshBasicMaterial
          color="#00ddff"
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>
      <pointLight position={[0, 0, 0]} color="#00ff88" intensity={2} distance={8} />
    </group>
  );
}

function MouseCamera() {
  const { camera } = useThree();
  const targetPos = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (typeof window === "undefined") return;
    const targetX = (window.innerWidth / 2 - (window as any)._mouseX || 0) * 0.002;
    const targetY = ((window as any)._mouseY || 0) * 0.002;
    targetPos.current.x += (targetX - targetPos.current.x) * 0.05;
    targetPos.current.y += (targetY - targetPos.current.y) * 0.05;
    camera.position.x = targetPos.current.x;
    camera.position.y = -targetPos.current.y;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export function Hero3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} color="#00ff88" intensity={1} />
        <pointLight position={[-5, -5, 5]} color="#ff0080" intensity={0.8} />

        <MebiousCore />
        <FloatingParticles count={180} />
        <MouseCamera />
      </Canvas>
    </div>
  );
}
