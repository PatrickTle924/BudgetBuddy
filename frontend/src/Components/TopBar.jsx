import React from "react";
import { LineChart, ShieldCheck, PlusCircle } from "lucide-react";
import { Button } from "./ui/Button";

export function TopBar() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-white">
          <LineChart className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Glidepath</h1>
          <p className="text-xs text-neutral-500">Your calendar-first money coach</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" className="hidden sm:inline-flex">
          <ShieldCheck className="h-4 w-4" /> Privacy Controls
        </Button>
        <Button>
          <PlusCircle className="h-4 w-4" /> Add Account
        </Button>
      </div>
    </div>
  );
}
