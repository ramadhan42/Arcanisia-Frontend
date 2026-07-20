import type { Metadata } from "next";
import Sample3DView from "@/components/Sample/Sample3DView";

export const metadata: Metadata = {
  title: "3D Sample | Arcanisia",
  description: "Website 3D sample demo for Arcanisia — local GLB viewer.",
};

export default function Sample3DPage() {
  return <Sample3DView />;
}
