import React from "react";

// to condense tailwind conditionals
function cn(...cls) {
  return cls.filter(Boolean).join(" ");
}

export function Button({ children, variant = "primary", className, type = "button", onClick }) {
  const base =
    "inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition shadow-sm";
  const styles = {
    primary: "bg-black text-white hover:bg-neutral-800 active:scale-[.99]",
    ghost: "bg-transparent hover:bg-neutral-100",
    outline: "border border-neutral-300 hover:bg-neutral-50 text-neutral-800",
  };

  return (
    <button type={type} onClick={onClick} className={cn(base, styles[variant], className)}>
      {children}
    </button>
  );
}
