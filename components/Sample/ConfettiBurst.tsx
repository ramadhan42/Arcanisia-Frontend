"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { GiftPalette } from "./extractModelPalette";

const PARTICLE_COUNT = 88;
const DURATION = 2.4;

type ConfettiBurstProps = {
  burstKey: number;
  palette: GiftPalette;
  center: THREE.Vector3;
  radius: number;
};

type ParticleData = {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  axis: THREE.Vector3;
  spin: number;
  scale: THREE.Vector3;
  color: THREE.Color;
};

export default function ConfettiBurst({
  burstKey,
  palette,
  center,
  radius,
}: ConfettiBurstProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const particlesRef = useRef<ParticleData[]>([]);
  const activeRef = useRef(false);
  const burstStartRef = useRef<number | null>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const colors = useMemo(() => {
    const white = new THREE.Color("#ffffff");
    const pinkDeep = new THREE.Color("#e8729a");
    const pinkBright = new THREE.Color("#ff9ec4");
    const base = [
      new THREE.Color(palette.primary),
      new THREE.Color(palette.secondary),
      new THREE.Color(palette.accent),
      new THREE.Color(palette.ribbon),
      pinkBright,
      pinkDeep,
    ];

    const shaded: THREE.Color[] = [];
    for (const c of base) {
      shaded.push(c);
      shaded.push(c.clone().lerp(white, 0.4));
      shaded.push(c.clone().lerp(pinkDeep, 0.18));
    }
    return shaded;
  }, [palette]);

  useLayoutEffect(() => {
    if (burstKey <= 0) return;

    const particles: ParticleData[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const shell = 0.42 + Math.random() * 0.58;
      const offset = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta) * radius * shell,
        (Math.sin(phi) * Math.sin(theta) * 0.55 + 0.2) * radius * shell,
        Math.cos(phi) * radius * shell * 0.85,
      );

      const position = center.clone().add(offset);
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 1.6,
        1.1 + Math.random() * 1.8,
        0.45 + Math.random() * 1.1,
      );
      velocity.add(offset.clone().normalize().multiplyScalar(0.7 + Math.random() * 0.9));

      particles.push({
        position,
        velocity,
        axis: new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize(),
        spin: (Math.random() - 0.5) * 10,
        scale: new THREE.Vector3(
          0.035 + Math.random() * 0.045,
          0.018 + Math.random() * 0.028,
          0.008 + Math.random() * 0.01,
        ),
        color: colors[Math.floor(Math.random() * colors.length)].clone(),
      });
    }

    particlesRef.current = particles;
    activeRef.current = true;
    burstStartRef.current = null;

    const mesh = meshRef.current;
    if (!mesh) return;

    mesh.visible = true;
    particles.forEach((particle, index) => {
      mesh.setColorAt(index, particle.color);
    });
    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }
  }, [burstKey, center, colors, radius]);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh || !activeRef.current || burstKey <= 0) return;

    if (burstStartRef.current === null) {
      burstStartRef.current = state.clock.elapsedTime;
    }

    const elapsed = state.clock.elapsedTime - burstStartRef.current;
    if (elapsed > DURATION) {
      activeRef.current = false;
      mesh.visible = false;
      return;
    }

    const fade = 1 - Math.pow(elapsed / DURATION, 1.55);
    const gravity = -2.1;

    particlesRef.current.forEach((particle, index) => {
      particle.velocity.y += gravity * delta;
      particle.position.addScaledVector(particle.velocity, delta);

      dummy.position.copy(particle.position);
      dummy.scale.set(
        particle.scale.x * fade,
        particle.scale.y * fade,
        particle.scale.z * fade,
      );
      dummy.setRotationFromAxisAngle(particle.axis, particle.spin * elapsed);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  if (burstKey <= 0) return null;

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, PARTICLE_COUNT]}
      frustumCulled={false}
      renderOrder={20}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial vertexColors toneMapped={false} transparent opacity={0.95} />
    </instancedMesh>
  );
}
