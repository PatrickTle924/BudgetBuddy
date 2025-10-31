import React from "react";
import { Card } from "./ui/Card";
import { LineChart } from "lucide-react";
import { Sparkline } from "./ui/Sparkline";

export function ForecastCard({ data }) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-neutral-600">12-week forecast</p>
          <h3 className="text-lg font-semibold">Balance trend</h3>
        </div>
        <div className="rounded-2xl bg-neutral-900 p-3 text-white">
          <LineChart className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-4">
        <Sparkline data={data} />
      </div>
    </Card>
  );
}
