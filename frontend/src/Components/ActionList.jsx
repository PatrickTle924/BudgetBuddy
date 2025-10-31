import React from "react";
import { Card } from "./ui/Card";
import { Zap } from "lucide-react";
import { ActionCard } from "./ActionCard";

const demoActionCards = [
  { id: "1", type: "buffer", title: "Avoid a dip next Thursday", body: "Move $25 to Buffer after payday.", impact: "Risk −18%" },
  { id: "2", type: "shift", title: "Shift transfer date", body: "Move $50 savings transfer from 1st → 6th.", impact: "Prevents dip" },
  { id: "3", type: "subs", title: "2 new subscriptions (+$18/mo)", body: "Spotify + Canva", impact: "Review duplicates" },
];

export function ActionList() {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-neutral-600">Suggested</p>
          <h3 className="text-lg font-semibold">Action Cards</h3>
        </div>
        <div className="rounded-2xl bg-neutral-900 p-3 text-white">
          <Zap className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {demoActionCards.map((c) => (
          <ActionCard key={c.id} {...c} />
        ))}
      </div>
    </Card>
  );
}
