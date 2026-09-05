"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "motion/react";

interface HeroSceneProps {
  active: boolean; // false when the hero is scrolled out of view → rendering pauses
  lite: boolean; // true on small screens → fewer objects, lower pixel ratio
}

const pointer = { x: 0, y: 0 };

/** The Derfive artifact: dark faceted shell, lime wireframe core, orbiting debris. */
function Artifact({ lite, reduce }: { lite: boolean; reduce: boolean }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.PointLight>(null);
  const debris = useRef<THREE.InstancedMesh>(null);
  const { camera } = useThree();

  const shellGeo = useMemo(() => new THREE.DodecahedronGeometry(1.35, 0), []);
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(shellGeo), [shellGeo]);
  useEffect(() => () => { shellGeo.dispose(); edgesGeo.dispose(); }, [shellGeo, edgesGeo]);

  const count = lite ? 14 : 28;
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        radius: 2.2 + (i % 5) * 0.35 + Math.random() * 0.4,
        speed: 0.12 + Math.random() * 0.18,
        phase: Math.random() * Math.PI * 2,
        tilt: (Math.random() - 0.5) * 1.2,
        size: 0.5 + Math.random(),
      })),
    [count],
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const baseX = lite ? 0 : 1.7;

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const scroll = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
    const g = group.current;
    if (!g) return;

    const px = reduce ? 0 : pointer.x;
    const py = reduce ? 0 : pointer.y;

    g.rotation.y += dt * (reduce ? 0.02 : 0.12);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0.25 + scroll * 0.9 - py * 0.25, 0.05);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, px * 0.15, 0.05);
    g.position.y = (reduce ? 0 : Math.sin(t * 0.8) * 0.12) - scroll * 3;
    g.position.x = THREE.MathUtils.lerp(g.position.x, baseX + px * 0.25, 0.05);

    if (core.current) core.current.rotation.y -= dt * (reduce ? 0.03 : 0.35);
    if (glow.current) glow.current.intensity = reduce ? 2.2 : 2.2 + Math.sin(t * 1.6) * 0.8;

    if (debris.current) {
      seeds.forEach((s, i) => {
        const a = s.phase + t * (reduce ? 0.02 : s.speed);
        dummy.position.set(Math.cos(a) * s.radius, Math.sin(a * 1.3) * 0.5 * s.tilt, Math.sin(a) * s.radius);
        dummy.rotation.set(a, a * 0.7, 0);
        dummy.scale.setScalar(s.size);
        dummy.updateMatrix();
        debris.current!.setMatrixAt(i, dummy.matrix);
      });
      debris.current.instanceMatrix.needsUpdate = true;
    }

    // Camera: subtle parallax with the mouse, pulls back as the page scrolls.
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, px * 0.35, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.6 + py * 0.2, 0.04);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 6 + scroll * 1.5, 0.05);
    camera.lookAt(baseX * 0.6, -scroll * 1.5, 0);
  });

  return (
    <group ref={group} position={[baseX, 0, 0]}>
      <mesh geometry={shellGeo}>
        <meshStandardMaterial color="#141416" roughness={0.38} metalness={0.55} flatShading />
      </mesh>
      <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial color="#c8f542" transparent opacity={0.35} />
      </lineSegments>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.72, 1]} />
        <meshBasicMaterial color="#c8f542" wireframe transparent opacity={0.9} />
      </mesh>
      <pointLight ref={glow} color="#c8f542" intensity={2.5} distance={5} decay={2} />

      <instancedMesh ref={debris} args={[undefined, undefined, count]} frustumCulled={false}>
        <tetrahedronGeometry args={[0.07, 0]} />
        <meshStandardMaterial color="#8b8b94" roughness={0.6} metalness={0.3} flatShading />
      </instancedMesh>
    </group>
  );
}

function Environment() {
  return (
    <>
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 7, 20]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 7, 3]} intensity={2.6} />
      <pointLight position={[-5, -2, 3]} intensity={14} color="#c8f542" distance={14} decay={2} />
      <gridHelper args={[70, 70, "#1e1e21", "#121214"]} position={[0, -2.4, 0]} />
    </>
  );
}

export default function HeroScene({ active, lite }: HeroSceneProps) {
  // Read the preference HERE (outside the canvas) — React context doesn't cross into the R3F root.
  const reduce = useReducedMotion() ?? false;

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={lite ? 1 : [1, 1.6]}
      camera={{ position: [0, 0.6, 6], fov: 42, near: 0.1, far: 40 }}
      gl={{ antialias: !lite, alpha: false, powerPreference: "high-performance" }}
      className="absolute! inset-0"
      aria-hidden
    >
      <Environment />
      <Artifact lite={lite} reduce={reduce} />
    </Canvas>
  );
}
