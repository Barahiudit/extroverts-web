"use client";

import { useEffect, useState } from "react";

interface RotatingTextProps {
  texts: string[];
  interval?: number;
  className?: string;
  textClassName?: string;
}

export function RotatingText({
  texts,
  interval = 3000,
  className = "",
  textClassName = "text-sm",
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
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ height: "1.25rem" }}
    >
      {texts.map((text, i) => (
        <p
          key={i}
          className={`absolute inset-0 flex items-center font-semibold uppercase tracking-wide transition-all duration-500 ease-in-out ${textClassName}`}
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