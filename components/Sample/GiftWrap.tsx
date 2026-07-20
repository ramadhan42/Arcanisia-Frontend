"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import type { GiftPalette } from "./extractModelPalette";

type DollPackagingProps = {
  palette: GiftPalette;
  width: number;
  height: number;
  depth: number;
  openProgressRef: React.MutableRefObject<number>;
};

const PADDING = 1.08;
const WALL = 0.06;

function BoxShell({
  outerW,
  outerH,
  outerD,
  halfW,
  halfH,
  halfD,
  wall,
  color,
}: {
  outerW: number;
  outerH: number;
  outerD: number;
  halfW: number;
  halfH: number;
  halfD: number;
  wall: number;
  color: string;
}) {
  const geometry = useMemo(() => {
    const insetW = outerW - wall * 2;
    const insetH = outerH - wall * 2;
    const backZ = -halfD + wall / 2;
    const frontZ = halfD - wall * 2.2;
    const panelD = frontZ - backZ;
    const panelZ = (frontZ + backZ) / 2;

    const parts: THREE.BoxGeometry[] = [];

    parts.push(new THREE.BoxGeometry(insetW, outerH, wall));
    parts[parts.length - 1].translate(0, 0, backZ);

    parts.push(new THREE.BoxGeometry(wall, insetH, panelD));
    parts[parts.length - 1].translate(-halfW + wall / 2, 0, panelZ);

    parts.push(new THREE.BoxGeometry(wall, insetH, panelD));
    parts[parts.length - 1].translate(halfW - wall / 2, 0, panelZ);

    parts.push(new THREE.BoxGeometry(insetW, wall, panelD));
    parts[parts.length - 1].translate(0, halfH - wall / 2, panelZ);

    parts.push(new THREE.BoxGeometry(insetW, wall, panelD));
    parts[parts.length - 1].translate(0, -halfH + wall / 2, panelZ);

    return mergeGeometries(parts, false)!;
  }, [halfD, halfH, halfW, outerH, outerW, wall]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color={color} roughness={0.68} metalness={0.04} />
    </mesh>
  );
}

function trimMat(color: string) {
  return (
    <meshStandardMaterial color={color} roughness={0.42} metalness={0.06} />
  );
}

export default function GiftWrap({
  palette,
  width,
  height,
  depth,
  openProgressRef,
}: DollPackagingProps) {
  const swayRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Group>(null);
  const frontPanelRef = useRef<THREE.Group>(null);
  const ribbonVerticalRef = useRef<THREE.Mesh>(null);
  const ribbonHorizontalRef = useRef<THREE.Mesh>(null);
  const bowRef = useRef<THREE.Group>(null);

  const dims = useMemo(() => {
    const innerW = width * PADDING;
    const innerH = height * PADDING;
    const innerD = depth * PADDING + width * 0.08;
    const outerW = innerW + WALL * 2;
    const outerH = innerH + WALL * 2;
    const outerD = innerD + WALL * 2;
    const halfW = outerW / 2;
    const halfH = outerH / 2;
    const halfD = outerD / 2;

    const frameThick = WALL * 1.35;
    const trimGap = WALL * 0.55;
    const ribbonW = outerW * 0.1;

    const topStripY = halfH - WALL - trimGap - frameThick / 2;
    const bottomStripY = -halfH + WALL + trimGap + frameThick / 2;
    const windowH = topStripY - bottomStripY - frameThick;
    const windowW = innerW * 0.84;

    const frontTrimZ = halfD + WALL * 0.9;
    const ribbonVerticalZ = frontTrimZ + WALL * 0.5;
    const ribbonHorizontalZ = frontTrimZ + WALL * 0.95;

    return {
      innerW,
      innerH,
      innerD,
      outerW,
      outerH,
      outerD,
      halfW,
      halfH,
      halfD,
      frameThick,
      ribbonW,
      topStripY,
      bottomStripY,
      windowH,
      windowW,
      frontTrimZ,
      ribbonVerticalZ,
      ribbonHorizontalZ,
      leftTrimX: -windowW / 2 - frameThick / 2,
      rightTrimX: windowW / 2 + frameThick / 2,
      panelCenterY: (topStripY + bottomStripY) / 2,
      lidY: halfH + WALL * 0.55,
      bowY: halfH + WALL * 0.85,
    };
  }, [width, height, depth]);

  useLayoutEffect(() => {
    const { bottomStripY, frontTrimZ, lidY, bowY } = dims;

    if (frontPanelRef.current) {
      frontPanelRef.current.position.set(0, bottomStripY, frontTrimZ);
      frontPanelRef.current.rotation.set(0, 0, 0);
    }
    if (ribbonVerticalRef.current) {
      ribbonVerticalRef.current.position.set(0, dims.panelCenterY - bottomStripY, WALL * 0.5);
    }
    if (ribbonHorizontalRef.current) {
      ribbonHorizontalRef.current.position.set(0, dims.panelCenterY - bottomStripY, WALL * 0.95);
    }
    if (lidRef.current) lidRef.current.position.set(0, lidY, -WALL * 0.15);
    if (bowRef.current) bowRef.current.position.set(0, bowY, -WALL * 0.2);
  }, [dims]);

  useFrame((state) => {
    const progress = openProgressRef.current;
    const t = state.clock.getElapsedTime();
    const swayDamp = 1 - progress * 0.55;

    if (swayRef.current) {
      const phase = t * 0.48;
      swayRef.current.rotation.y = Math.sin(phase) * 0.065 * swayDamp;
      swayRef.current.rotation.z = Math.sin(phase * 0.82 + 0.4) * 0.014 * swayDamp;
    }

    const easedProgress = 1 - Math.pow(1 - progress, 2);
    const lidLift = dims.outerH * 0.2 * easedProgress;
    const panelDrop = dims.outerH * 0.05 * easedProgress;
    const panelForward = WALL * 0.55 * easedProgress;

    if (frontPanelRef.current) {
      frontPanelRef.current.position.set(
        0,
        dims.bottomStripY - panelDrop,
        dims.frontTrimZ + panelForward,
      );
      frontPanelRef.current.rotation.x = easedProgress * 1.35;
    }
    if (ribbonVerticalRef.current) {
      ribbonVerticalRef.current.scale.setScalar(1 - progress * 0.35);
    }
    if (ribbonHorizontalRef.current) {
      ribbonHorizontalRef.current.scale.setScalar(1 - progress * 0.3);
    }
    if (lidRef.current) {
      lidRef.current.position.set(0, dims.lidY + lidLift, -WALL * 0.15);
      lidRef.current.rotation.x = -easedProgress * 0.34;
    }
    if (bowRef.current) {
      bowRef.current.position.set(0, dims.bowY + lidLift * 0.85, -WALL * 0.2);
    }
  });

  const {
    outerW,
    outerH,
    outerD,
    halfW,
    halfH,
    halfD,
    innerW,
    innerD,
    frameThick,
    windowH,
    windowW,
    ribbonW,
  } = dims;

  return (
    <group ref={swayRef}>
      <BoxShell
        outerW={outerW}
        outerH={outerH}
        outerD={outerD}
        halfW={halfW}
        halfH={halfH}
        halfD={halfD}
        wall={WALL}
        color={palette.primary}
      />

      <group ref={lidRef}>
        <mesh>
          <boxGeometry args={[outerW - WALL * 2, WALL * 0.7, outerD - WALL * 3]} />
          <meshStandardMaterial color={palette.secondary} roughness={0.58} metalness={0.04} />
        </mesh>
      </group>

      <mesh position={[0, -halfH + WALL * 2.4, -WALL * 0.1]}>
        <boxGeometry args={[innerW * 0.94, WALL * 0.35, innerD * 0.85]} />
        <meshStandardMaterial color={palette.secondary} roughness={0.62} />
      </mesh>

      <group ref={frontPanelRef}>
        <mesh position={[0, dims.topStripY - dims.bottomStripY, 0]}>
          <boxGeometry args={[outerW, frameThick, WALL * 0.38]} />
          {trimMat(palette.accent)}
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[outerW, frameThick, WALL * 0.38]} />
          {trimMat(palette.accent)}
        </mesh>
        <mesh position={[dims.leftTrimX, dims.panelCenterY - dims.bottomStripY, 0]}>
          <boxGeometry args={[frameThick, windowH, WALL * 0.38]} />
          {trimMat(palette.accent)}
        </mesh>
        <mesh position={[dims.rightTrimX, dims.panelCenterY - dims.bottomStripY, 0]}>
          <boxGeometry args={[frameThick, windowH, WALL * 0.38]} />
          {trimMat(palette.accent)}
        </mesh>

        <mesh ref={ribbonVerticalRef}>
          <boxGeometry args={[ribbonW, windowH * 0.94, WALL * 0.28]} />
          {trimMat(palette.ribbon)}
        </mesh>
        <mesh ref={ribbonHorizontalRef}>
          <boxGeometry args={[windowW * 0.9, ribbonW * 0.72, WALL * 0.28]} />
          {trimMat(palette.accent)}
        </mesh>
      </group>

      <group ref={bowRef}>
        <mesh rotation={[0, 0, 0.55]} position={[-outerW * 0.085, 0, 0]}>
          <torusGeometry args={[outerW * 0.07, outerW * 0.02, 10, 24, Math.PI]} />
          {trimMat(palette.accent)}
        </mesh>
        <mesh rotation={[0, 0, -0.55]} position={[outerW * 0.085, 0, 0]}>
          <torusGeometry args={[outerW * 0.07, outerW * 0.02, 10, 24, Math.PI]} />
          {trimMat(palette.accent)}
        </mesh>
      </group>
    </group>
  );
}
