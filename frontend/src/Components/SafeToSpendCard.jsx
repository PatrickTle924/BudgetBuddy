import React from "react";
import { Card } from "./ui/Card";
import { Wallet } from "lucide-react";

export function SafeToSpendCard({ value, nextDip }) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-neutral-600">Safe-to-Spend</p>
          <div className="mt-1 text-3xl font-semibold tracking-tight">${value}</div>
          {nextDip && (
            <p className="mt-2 text-xs text-neutral-500">
              Projected dip: <span className="font-medium text-neutral-700">{nextDip}</span>
            </p>
          )}
        </div>
        <div className="rounded-2xl bg-neutral-900 p-3 text-white">
          <Wallet className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}
