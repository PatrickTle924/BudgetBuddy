import React from "react";
import { TopBar } from "./components/TopBar";
import { UploadCSVCard } from "./components/UploadCSVCard";
import { SafeToSpendCard } from "./components/SafeToSpendCard";
import { ForecastCard } from "./components/ForecastCard";
import { ActionList } from "./components/ActionList";
import { WhatIfPanel } from "./components/WhatIfPanel";
import { demoBalances } from "./data/demo_data";
import './App.css'

export default function App() {
  const safeToSpend = 845;
  const nextDip = "Thu, Nov 13";

  function fakeUpload(file) {
    alert(`Received file: ${file.name}. (MVP will POST /ingest/csv then show progress.)`);
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(120deg,#f8fafc,white_40%,#f5f5f4)]">
      <div className="mx-auto max-w-6xl px-4 py-6 md:py-10">
        <TopBar />

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <UploadCSVCard onUpload={fakeUpload} />
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <SafeToSpendCard value={safeToSpend} nextDip={nextDip} />
              <ForecastCard data={demoBalances} />
            </div>
          </div>

          <div className="md:col-span-1">
            <ActionList />
            <div className="mt-6">
              <WhatIfPanel />
            </div>
          </div>
        </div>

        <footer className="mt-10 text-center text-xs text-neutral-500">
          <p>
            Demo UI — Hook these components to your Flask endpoints:{" "}
            <code>/ingest/csv</code>, <code>/forecast</code>, <code>/action-cards</code>,{" "}
            <code>/what-if</code>.
          </p>
        </footer>
      </div>
    </div>
  );
}
