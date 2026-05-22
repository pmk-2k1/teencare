"use client";

import { useState, useEffect } from "react";

export default function ConfettiEffect() {
  const [pieces, setPieces] = useState<
    Array<{
      id: number;
      left: number;
      color: string;
      delay: number;
      size: number;
      round: boolean;
    }>
  >([]);

  useEffect(() => {
    const colors = [
      "#a855f7",
      "#ec4899",
      "#06b6d4",
      "#f59e0b",
      "#10b981",
      "#f472b6",
      "#c084fc",
    ];
    const newPieces = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.5,
      size: Math.random() * 8 + 6,
      round: Math.random() > 0.5,
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className="confetti-container">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            top: "100%",
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            borderRadius: piece.round ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  );
}
