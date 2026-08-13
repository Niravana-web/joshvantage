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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="Josh Vantage Consulting Group" />
    </div>
  );
}
