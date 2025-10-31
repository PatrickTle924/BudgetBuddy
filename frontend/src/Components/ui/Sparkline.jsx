import React from "react";

export function Sparkline({ data, height = 64 }) {
  const width = 220;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  });
  const path = `M ${points[0]} L ${points.slice(1).join(" ")}`;
  const [lastX, lastY] = points[points.length - 1]?.split(",") || [0, 0];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-16">
      <path d={path} fill="none" stroke="#111" strokeWidth={2} />
      <circle cx={lastX} cy={lastY} r={3} fill="#111" />
    </svg>
  );
}
