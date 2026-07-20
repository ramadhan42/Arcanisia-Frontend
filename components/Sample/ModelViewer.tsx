"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Gift,
  Minus,
  Plus,
  RotateCcw,
} from "lucide-react";
import PackagedDoll from "@/components/Sample/PackagedDoll";
import {
  extractModelPalette,
  FALLBACK_SAMPLE_THEME,
  paletteToPageTheme,
  type SamplePageTheme,
} from "@/components/Sample/extractModelPalette";

const MODEL_PATH = "/gambar/3d/bo_peep_toy_story.glb";
const PAN_STEP = 0.14;
const TARGET_SIZE = 2.2;

const panVector = new THREE.Vector3();
const panRight = new THREE.Vector3();
const panUp = new THREE.Vector3();

function canCreateWebGLContext() {
  if (typeof window === "undefined") return false;

  try {
    const canvas = document.createElement("canvas");
    const context =
      canvas.getContext("webgl2", {
        alpha: false,
        antialias: false,
        depth: true,
        powerPreference: "low-power",
        preserveDrawingBuffer: false,
        stencil: false,
      }) ??
      canvas.getContext("webgl", {
        alpha: false,
        antialias: false,
        depth: true,
        powerPreference: "low-power",
        preserveDrawingBuffer: false,
        stencil: false,
      });

    return Boolean(context);
  } catch {
    return false;
  }
}

function panCamera(controls: OrbitControlsImpl, dx: number, dy: number) {
  const camera = controls.object;
  panRight.setFromMatrixColumn(camera.matrix, 0);
  panUp.setFromMatrixColumn(camera.matrix, 1);
  panVector
    .copy(panRight)
    .multiplyScalar(-dx * PAN_STEP)
    .add(panUp.clone().multiplyScalar(dy * PAN_STEP));
  camera.position.add(panVector);
  controls.target.add(panVector);
  controls.update();
}

function Model({
  onLoaded,
  onTheme,
  isPackagingOpen,
}: {
  onLoaded: () => void;
  onTheme: (theme: SamplePageTheme) => void;
  isPackagingOpen: boolean;
}) {
  const { scene } = useGLTF(MODEL_PATH);

  const layout = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const modelSize = box.getSize(new THREE.Vector3());
    const modelCenter = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(modelSize.x, modelSize.y, modelSize.z, 0.001);
    const scale = TARGET_SIZE / maxDim;
    const palette = extractModelPalette(scene);
    const dollZ =
      -modelCenter.z * scale - modelSize.z * scale * 0.1;

    return {
      scale,
      size: modelSize,
      center: modelCenter,
      palette,
      theme: paletteToPageTheme(palette),
      dollPosition: new THREE.Vector3(
        -modelCenter.x * scale,
        -modelCenter.y * scale,
        dollZ,
      ),
      scaledSize: {
        width: modelSize.x * scale,
        height: modelSize.y * scale,
        depth: modelSize.z * scale,
      },
    };
  }, [scene]);

  useEffect(() => {
    onTheme(layout.theme);
    onLoaded();
  }, [layout.theme, onLoaded, onTheme]);

  return (
    <PackagedDoll scene={scene} layout={layout} isOpen={isPackagingOpen} />
  );
}

function LoaderFallback({ color }: { color: string }) {
  return (
    <mesh>
      <boxGeometry args={[0.6, 0.6, 0.6]} />
      <meshStandardMaterial color={color} wireframe />
    </mesh>
  );
}

function Scene({
  controlsRef,
  theme,
  onLoaded,
  onTheme,
  isPackagingOpen,
}: {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  theme: SamplePageTheme;
  onLoaded: () => void;
  onTheme: (theme: SamplePageTheme) => void;
  isPackagingOpen: boolean;
}) {
  return (
    <>
      <color attach="background" args={[theme.bgCanvas]} />
      <fog attach="fog" args={[theme.fog, 10, 24]} />
      <hemisphereLight args={[theme.secondary, theme.primary, 0.55]} />
      <ambientLight intensity={0.5} color={theme.secondary} />
      <directionalLight position={[5, 7, 4]} intensity={1.2} color="#fff8f0" />
      <directionalLight position={[-3, 2, -2]} intensity={0.45} color={theme.ribbon} />

      <Suspense fallback={<LoaderFallback color={theme.accent} />}>
        <Model
          onLoaded={onLoaded}
          onTheme={onTheme}
          isPackagingOpen={isPackagingOpen}
        />
      </Suspense>

      <OrbitControls
        ref={controlsRef}
        makeDefault
        target={[0, 0, 0]}
        enablePan
        enableZoom
        screenSpacePanning
        minDistance={1.6}
        maxDistance={9}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.75}
        dampingFactor={0.08}
        rotateSpeed={0.75}
        zoomSpeed={0.9}
        panSpeed={0.85}
      />
    </>
  );
}

function PackagingButton({
  isOpen,
  onClick,
  theme,
}: {
  isOpen: boolean;
  onClick: () => void;
  theme: SamplePageTheme;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 rounded-full border px-4 py-2.5 font-graziemille text-[11px] tracking-[0.14em] uppercase shadow-[0_8px_24px_-10px_rgba(0,0,0,0.3)] backdrop-blur-sm transition-all hover:scale-[1.02] active:scale-[0.98] sm:px-5 sm:text-xs"
      style={{
        borderColor: `${theme.border}aa`,
        backgroundColor: `${theme.secondary}f0`,
        color: theme.accent,
      }}
    >
      <Gift size={16} strokeWidth={2.1} />
      {isOpen ? "Tutup Bungkus" : "Buka Bungkus"}
    </button>
  );
}

type ControlButtonProps = {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  theme: SamplePageTheme;
};

function ControlButton({ label, onClick, children, theme }: ControlButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-full border shadow-[0_8px_24px_-10px_rgba(0,0,0,0.25)] backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
      style={{
        borderColor: `${theme.border}99`,
        backgroundColor: `${theme.secondary}e6`,
        color: theme.accent,
      }}
    >
      {children}
    </button>
  );
}

type ModelViewerProps = {
  onThemeReady?: (theme: SamplePageTheme) => void;
};

export default function ModelViewer({ onThemeReady }: ModelViewerProps) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPackagingOpen, setIsPackagingOpen] = useState(false);
  const [canRender3D, setCanRender3D] = useState<boolean | null>(null);
  const [retryKey, setRetryKey] = useState(0);
  const [theme, setTheme] = useState<SamplePageTheme>(FALLBACK_SAMPLE_THEME);

  useEffect(() => {
    setIsReady(false);
    setCanRender3D(canCreateWebGLContext());
  }, [retryKey]);

  const handleTheme = useCallback(
    (next: SamplePageTheme) => {
      setTheme((current) => {
        if (
          current.bg === next.bg &&
          current.bgDeep === next.bgDeep &&
          current.bgCanvas === next.bgCanvas &&
          current.primary === next.primary &&
          current.secondary === next.secondary &&
          current.accent === next.accent &&
          current.border === next.border &&
          current.text === next.text &&
          current.textMuted === next.textMuted &&
          current.ribbon === next.ribbon &&
          current.fog === next.fog
        ) {
          return current;
        }

        return next;
      });
      onThemeReady?.(next);
    },
    [onThemeReady],
  );

  const handleLoaded = useCallback(() => {
    window.requestAnimationFrame(() => {
      controlsRef.current?.saveState();
      setIsReady(true);
    });
  }, []);

  const updateControls = useCallback(() => {
    controlsRef.current?.update();
  }, []);

  const zoom = useCallback(
    (direction: "in" | "out") => {
      const controls = controlsRef.current;
      if (!controls) return;
      if (direction === "in") controls.dollyIn(1.18);
      else controls.dollyOut(1.18);
      updateControls();
    },
    [updateControls],
  );

  const pan = useCallback((x: number, y: number) => {
    const controls = controlsRef.current;
    if (!controls) return;
    panCamera(controls, x, y);
  }, []);

  const resetView = useCallback(() => {
    controlsRef.current?.reset();
    updateControls();
  }, [updateControls]);

  return (
    <div
      className="relative h-full min-h-[420px] w-full overflow-hidden rounded-sm border lg:min-h-[560px]"
      style={{
        borderColor: `${theme.border}66`,
        background: `radial-gradient(ellipse at center, ${theme.bg} 0%, ${theme.bgDeep} 55%, ${theme.primary}33 100%)`,
      }}
    >
      {canRender3D ? (
        <Canvas
          key={retryKey}
          camera={{ position: [0, 0.2, 5.4], fov: 36 }}
          dpr={1}
          gl={{
            alpha: false,
            antialias: false,
            depth: true,
            powerPreference: "low-power",
            preserveDrawingBuffer: false,
            stencil: false,
          }}
          performance={{ min: 0.5 }}
          className="touch-none"
        >
          <Scene
            controlsRef={controlsRef}
            theme={theme}
            onLoaded={handleLoaded}
            onTheme={handleTheme}
            isPackagingOpen={isPackagingOpen}
          />
        </Canvas>
      ) : null}

      {canRender3D === null && (
        <div
          className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center backdrop-blur-[1px]"
          style={{ backgroundColor: `${theme.bgDeep}cc` }}
        >
          <p
            className="font-graziemille text-sm tracking-[0.25em]"
            style={{ color: theme.textMuted }}
          >
            Loading 3D…
          </p>
        </div>
      )}

      {canRender3D === false && (
        <div
          className="absolute inset-0 z-[6] flex flex-col items-center justify-center gap-4 px-6 text-center"
          style={{ backgroundColor: `${theme.bgDeep}ee`, color: theme.text }}
        >
          <div className="space-y-2">
            <p className="font-gilland text-2xl">3D viewer belum bisa dibuka</p>
            <p
              className="max-w-md font-graziemille text-xs leading-relaxed tracking-[0.08em] sm:text-sm"
              style={{ color: theme.textMuted }}
            >
              Browser sedang memblokir WebGL context. Coba jalankan ulang viewer
              di bawah ini.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setRetryKey((key) => key + 1)}
            className="rounded-full border px-5 py-2.5 font-graziemille text-xs uppercase tracking-[0.14em] transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{
              borderColor: `${theme.border}aa`,
              backgroundColor: `${theme.secondary}e8`,
              color: theme.accent,
            }}
          >
            Coba Muat 3D Lagi
          </button>
        </div>
      )}

      {canRender3D && !isReady && (
        <div
          className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center backdrop-blur-[1px]"
          style={{ backgroundColor: `${theme.bgDeep}cc` }}
        >
          <p
            className="font-graziemille text-sm tracking-[0.25em]"
            style={{ color: theme.textMuted }}
          >
            Loading 3D…
          </p>
        </div>
      )}

      {canRender3D && isReady && (
        <>
          <div className="absolute right-4 top-4 z-10 sm:right-5">
            <PackagingButton
              isOpen={isPackagingOpen}
              onClick={() => setIsPackagingOpen((open) => !open)}
              theme={theme}
            />
          </div>

          <div className="absolute right-4 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-2 sm:right-5 sm:top-[58%]">
            <ControlButton label="Zoom in" theme={theme} onClick={() => zoom("in")}>
              <Plus size={18} strokeWidth={2.25} />
            </ControlButton>
            <ControlButton label="Zoom out" theme={theme} onClick={() => zoom("out")}>
              <Minus size={18} strokeWidth={2.25} />
            </ControlButton>
          </div>

          <div className="absolute bottom-4 left-1/2 z-10 grid -translate-x-1/2 grid-cols-3 grid-rows-3 gap-1.5 sm:bottom-5">
            <div />
            <ControlButton label="Move up" theme={theme} onClick={() => pan(0, 1)}>
              <ArrowUp size={17} strokeWidth={2.25} />
            </ControlButton>
            <div />
            <ControlButton label="Move left" theme={theme} onClick={() => pan(1, 0)}>
              <ArrowLeft size={17} strokeWidth={2.25} />
            </ControlButton>
            <ControlButton label="Reset view" theme={theme} onClick={resetView}>
              <RotateCcw size={16} strokeWidth={2.25} />
            </ControlButton>
            <ControlButton label="Move right" theme={theme} onClick={() => pan(-1, 0)}>
              <ArrowRight size={17} strokeWidth={2.25} />
            </ControlButton>
            <div />
            <ControlButton label="Move down" theme={theme} onClick={() => pan(0, -1)}>
              <ArrowDown size={17} strokeWidth={2.25} />
            </ControlButton>
            <div />
          </div>

          <p
            className="pointer-events-none absolute left-4 top-4 z-10 max-w-[200px] font-graziemille text-[10px] leading-relaxed tracking-[0.12em] sm:max-w-[240px] sm:text-[11px]"
            style={{ color: theme.textMuted }}
          >
            Drag to rotate · Scroll to zoom · Use buttons to move
          </p>
        </>
      )}
    </div>
  );
}

useGLTF.preload(MODEL_PATH);
