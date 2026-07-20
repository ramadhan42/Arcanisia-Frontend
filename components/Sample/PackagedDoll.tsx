"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import GiftWrap from "@/components/Sample/GiftWrap";
import AnimatedDoll from "@/components/Sample/AnimatedDoll";
import ConfettiBurst from "@/components/Sample/ConfettiBurst";
import type { GiftPalette, SamplePageTheme } from "./extractModelPalette";

export type DollLayout = {
  scale: number;
  palette: GiftPalette;
  theme: SamplePageTheme;
  dollPosition: THREE.Vector3;
  scaledSize: { width: number; height: number; depth: number };
};

type PackagedDollProps = {
  scene: THREE.Group;
  layout: DollLayout;
  isOpen: boolean;
};

const OPEN_LERP = 0.028;

export default function PackagedDoll({ scene, layout, isOpen }: PackagedDollProps) {
  const openProgressRef = useRef(0);
  const targetOpenRef = useRef(0);
  const wasOpenRef = useRef(false);
  const [burstKey, setBurstKey] = useState(0);

  const emergeZ = useMemo(
    () => layout.scaledSize.depth * 0.72 + layout.scaledSize.width * 0.08,
    [layout.scaledSize.depth, layout.scaledSize.width],
  );

  const confettiRadius = useMemo(() => {
    const { width, height, depth } = layout.scaledSize;
    return Math.max(width, height, depth) * 0.78;
  }, [layout.scaledSize]);

  const confettiCenter = useMemo(
    () =>
      new THREE.Vector3(
        layout.dollPosition.x,
        layout.dollPosition.y + layout.scaledSize.height * 0.06,
        layout.dollPosition.z + layout.scaledSize.depth * 0.08,
      ),
    [layout.dollPosition, layout.scaledSize.depth, layout.scaledSize.height],
  );

  useEffect(() => {
    targetOpenRef.current = isOpen ? 1 : 0;

    if (isOpen && !wasOpenRef.current) {
      setBurstKey((key) => key + 1);
    }

    wasOpenRef.current = isOpen;
  }, [isOpen]);

  useFrame(() => {
    openProgressRef.current = THREE.MathUtils.lerp(
      openProgressRef.current,
      targetOpenRef.current,
      OPEN_LERP,
    );
  });

  return (
    <>
      <GiftWrap
        palette={layout.palette}
        {...layout.scaledSize}
        openProgressRef={openProgressRef}
      />
      <AnimatedDoll
        scene={scene}
        scale={layout.scale}
        position={layout.dollPosition}
        openProgressRef={openProgressRef}
        emergeZ={emergeZ}
      />
      <ConfettiBurst
        burstKey={burstKey}
        palette={layout.palette}
        center={confettiCenter}
        radius={confettiRadius}
      />
    </>
  );
}
