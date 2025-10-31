import React, { useState } from "react";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";

export function WhatIfPanel() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-neutral-600">Plan changes</p>
          <h3 className="text-lg font-semibold">What-If Simulator</h3>
        </div>
      </div>

      <form
        className="mt-4 flex flex-col gap-3 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          if (!text.trim()) return;
          setResult(`We'd apply: ${text}. Forecast updated (demo).`);
        }}
      >
        <input
          className="flex-1 rounded-2xl border border-neutral-300 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-900"
          placeholder="e.g., Rent +$200 starting 2025-12-01"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button type="submit">Simulate</Button>
      </form>

      {result && <p className="mt-3 text-sm text-neutral-700">{result}</p>}
    </Card>
  );
}
