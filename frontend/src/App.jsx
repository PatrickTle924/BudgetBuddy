import React, { useEffect, useState } from "react";
import { TopBar } from "./components/TopBar";
import { UploadCSVCard } from "./components/UploadCSVCard";
import { SafeToSpendCard } from "./components/SafeToSpendCard";
import { ForecastCard } from "./components/ForecastCard";
import { ActionList } from "./components/ActionList";
import { WhatIfPanel } from "./components/WhatIfPanel";
import { demoBalances } from "./data/demo_data";
import './App.css'

import {
  uploadTransactionsCsv,
  getOverview,
  getForecast,
  getActions,
  simulateWhatIf,
} from "./api";

export default function App() {
  const [overview, setOverview] = useState(null);
  const [forecast, setForecast] = useState([]);   // [{date, balance}]
  const [actions, setActions] = useState([]);
  const [simResult, setSimResult] = useState(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loadAll() {
    setLoading(true);
    try {
      const [ov, fc, ac] = await Promise.all([
        getOverview(),
        getForecast(12),
        getActions(),
      ]);
      setOverview(ov);
      setForecast(fc.points || []);
      setActions(ac || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
  }, []);

  async function handleUpload(file) {
    if (!file) return;
    setLoadingUpload(true);
    try {
      await uploadTransactionsCsv(file);
      await loadAll();
    } catch (e) {
      console.error(e);
      alert("Upload failed. Check console for details.");
    } finally {
      setLoadingUpload(false);
    }
  }

  async function handleSimulate(query) {
    try {
      const res = await simulateWhatIf(query);
      setSimResult(res);
    } catch (e) {
      console.error(e);
      alert("Simulation failed.");
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(120deg,#f8fafc,white_40%,#f5f5f4)]">
      <div className="mx-auto max-w-6xl px-4 py-6 md:py-10">
        <TopBar />

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <UploadCSVCard onUpload={handleUpload} isUploading={loadingUpload} />
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <SafeToSpendCard 
                value={overview?.safeToSpend ?? 0}
                nextDip={overview?.nextDipDate ?? null}
                loading={loading}
              />
              <ForecastCard 
                data={(forecast || []).map(p => p.balance)}
                labels={(forecast || []).map(p => p.date)}
                loading={loading} 
              />
            </div>
          </div>

          <div className="md:col-span-1">
            <ActionList items={actions} loading={loading} />
            <div className="mt-6">
              <WhatIfPanel onSimulate={handleSimulate} result={simResult}/>
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
