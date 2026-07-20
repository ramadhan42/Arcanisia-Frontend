"use client";

import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type AnimatedDollProps = {
  scene: THREE.Group;
  scale: number;
  position: THREE.Vector3;
  openProgressRef?: React.MutableRefObject<number>;
  emergeZ?: number;
};

type BoneBase = {
  rotation: THREE.Euler;
  position: THREE.Vector3;
};

export default function AnimatedDoll({
  scene,
  scale,
  position,
  openProgressRef,
  emergeZ = 0,
}: AnimatedDollProps) {
  const groupRef = useRef<THREE.Group>(null);

  const rig = useMemo(() => {
    const root = scene.getObjectByName("_rootJoint") as THREE.Object3D | null;
    const arm = scene.getObjectByName("Bo Peep_arm") as THREE.Object3D | null;
    const body = scene.getObjectByName("Bo Peep") as THREE.Object3D | null;

    const capture = (obj: THREE.Object3D | null): BoneBase | null => {
      if (!obj) return null;
      return {
        rotation: obj.rotation.clone(),
        position: obj.position.clone(),
      };
    };

    return {
      root,
      arm,
      body,
      base: {
        root: capture(root),
        arm: capture(arm),
        body: capture(body),
      },
    };
  }, [scene]);

  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  }, [scene]);

  useLayoutEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    group.scale.setScalar(scale);
    group.position.copy(position);
  }, [position, scale]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const group = groupRef.current;
    if (!group) return;

    const openProgress = openProgressRef?.current ?? 0;
    const emergeStart = 0.34;
    const emergeProgress = THREE.MathUtils.clamp(
      (openProgress - emergeStart) / (1 - emergeStart),
      0,
      1,
    );
    const easedOut = 1 - Math.pow(1 - emergeProgress, 2);
    const emerge = easedOut * emergeZ;
    const floatAmp = 0.012 * (1 + emergeProgress * 0.35);

    // Whole-body idle sway
    group.rotation.y = Math.sin(t * 0.55) * 0.045;
    group.rotation.x = Math.sin(t * 0.4 + 0.6) * 0.012;
    group.rotation.z = Math.sin(t * 0.32) * 0.008;

    // Breathing — subtle vertical scale pulse
    const breath = 1 + Math.sin(t * 1.15) * 0.014;
    group.scale.set(
      scale * breath,
      scale * (1 + Math.sin(t * 1.15) * 0.02),
      scale * breath,
    );

    // Gentle float + emerge from packaging
    group.position.set(
      position.x,
      position.y + Math.sin(t * 0.9) * floatAmp + easedOut * 0.04,
      position.z + emerge,
    );

    const { root, arm, body, base } = rig;

    if (root && base.root) {
      root.rotation.y =
        base.root.rotation.y + Math.sin(t * 0.5) * 0.025;
      root.position.y =
        base.root.position.y + Math.sin(t * 1.15) * 0.006;
    }

    if (body && base.body) {
      body.rotation.x =
        base.body.rotation.x + Math.sin(t * 1.15) * 0.018;
    }

    if (arm && base.arm) {
      arm.rotation.z =
        base.arm.rotation.z + Math.sin(t * 0.75 + 1.2) * 0.035;
      arm.rotation.x =
        base.arm.rotation.x + Math.sin(t * 0.6) * 0.02;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[position.x, position.y, position.z]}
      renderOrder={5}
    >
      <primitive object={scene} />
    </group>
  );
}
