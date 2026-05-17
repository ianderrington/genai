"use client";

import dynamic from "next/dynamic";

const PlasmaBackground = dynamic(() => import("./PlasmaBackground"), {
  ssr: false,
});

export default function PlasmaBackgroundLoader() {
  return <PlasmaBackground />;
}
