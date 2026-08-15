"use client";

import { useEffect, useState } from "react";

interface RotatingTextProps {
  texts: string[];
  interval?: number;
  className?: string;
}

export function RotatingText({
  texts,
  interval = 3000,
  className = "",
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (texts.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [texts.length, interval]);

  return (
    <div className={`relative overflow-hidden h-6 ${className}`}>
      {texts.map((text, i) => (
        <p
          key={i}
          className="absolute inset-0 text-[10px] font-semibold uppercase tracking-wide transition-all duration-500 ease-in-out"
          style={{
            transform: `translateY(${(i - index) * 100}%)`,
            opacity: i === index ? 1 : 0,
          }}
        >
          {text}
        </p>
      ))}
    </div>
  );
}