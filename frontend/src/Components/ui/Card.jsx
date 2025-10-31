import React from "react";

function cn(...cls) {
  return cls.filter(Boolean).join(" ");
}

export function Card({ children, className }) {
  return (
    <div
      className={cn(
        "rounded-3xl bg-white shadow-sm ring-1 ring-black/5 p-5 md:p-6",
        className
      )}
    >
      {children}
    </div>
  );
}
