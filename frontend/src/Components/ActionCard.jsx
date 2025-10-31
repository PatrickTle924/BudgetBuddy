import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, CalendarClock, Zap, ArrowRight } from "lucide-react";
import { Button } from "./ui/Button";

export function ActionCard({ title, body, impact, type }) {
  const icon =
    type === "buffer" ? (
      <ShieldCheck className="h-4 w-4" />
    ) : type === "shift" ? (
      <CalendarClock className="h-4 w-4" />
    ) : (
      <Zap className="h-4 w-4" />
    );

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <div className="flex items-start justify-between gap-3 rounded-2xl border border-neutral-200 p-4">
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-900 text-white">
            {icon}
          </div>
          <div>
            <p className="text-sm font-medium">{title}</p>
            <p className="text-sm text-neutral-600">{body}</p>
            <p className="mt-1 text-xs text-neutral-500">{impact}</p>
          </div>
        </div>
        <Button>
          Apply <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
