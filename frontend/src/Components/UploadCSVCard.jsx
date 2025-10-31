import React, { useState } from "react";
import { Card } from "./ui/Card";
import { Upload, Wallet, CalendarClock } from "lucide-react";

function cn(...cls) {
  return cls.filter(Boolean).join(" ");
}

export function UploadCSVCard({ onUpload }) {
  const [hover, setHover] = useState(false);

  return (
    <Card className="p-0 overflow-hidden">
      <div className="grid md:grid-cols-[1.2fr,1fr] bg-linear-to-br from-neutral-50 to-white">
        <div className="p-6 md:p-8">
          <div className="flex items-start gap-3 mb-4">
            <div className="h-10 w-10 rounded-2xl bg-black text-white flex items-center justify-center">
              <Upload className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-blue-500 text-lg font-semibold">Upload your transactions (CSV)</h2>
              <p className="text-sm text-neutral-600">
                Kickstart your forecast with 90–180 days of history.
              </p>
            </div>
          </div>

          <label
            onDragOver={(e) => {
              e.preventDefault();
              setHover(true);
            }}
            onDragLeave={() => setHover(false)}
            onDrop={(e) => {
              e.preventDefault();
              const f = e.dataTransfer.files?.[0];
              if (f) onUpload(f);
              setHover(false);
            }}
            className={cn(
              "mt-3 flex h-28 cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed",
              hover ? "border-black bg-neutral-50" : "border-neutral-200"
            )}
          >
            <div className="text-center">
              <p className="text-sm font-medium">Drag & drop CSV here</p>
              <p className="text-xs text-neutral-500">or click to choose a file</p>
            </div>
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onUpload(f);
              }}
            />
          </label>
        </div>

        <div className="border-t md:border-l md:border-t-0 border-neutral-200 p-6 md:p-8 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
              <Wallet className="h-4 w-4" />
            </div>
            <div className="text-sm">
              <p className="font-medium">Safe-to-Spend</p>
              <p className="text-neutral-500">Live amount after bills & buffer</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
              <CalendarClock className="h-4 w-4" />
            </div>
            <div className="text-sm">
              <p className="font-medium">Cash-flow calendar</p>
              <p className="text-neutral-500">12-week forecast with low-balance alerts</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
