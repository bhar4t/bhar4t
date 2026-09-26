"use client";

import dynamic from "next/dynamic";

// ssr: false requires a Client Component boundary; app/layout.js is a Server Component.
const DotRing = dynamic(() => import("./DotRing"), { ssr: false });

export default DotRing;
