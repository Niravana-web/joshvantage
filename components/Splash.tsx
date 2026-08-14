"use client";

import { useEffect, useState } from "react";

export default function Splash() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`splash${done ? " done" : ""}`} aria-hidden={done}>
      <div className="silk">
        <div className="silk-blob b1" />
        <div className="silk-blob b2" />
        <div className="silk-blob b3" />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="Josh Vantage Consulting Group" className="relative z-10" />
    </div>
  );
}
