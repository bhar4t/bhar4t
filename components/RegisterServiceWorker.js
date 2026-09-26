"use client";

import { useEffect } from "react";

// next-pwa only auto-injects its register script into the Pages Router "main.js"
// entry, so under the App Router the service worker must be registered manually.
export default function RegisterServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  return null;
}
