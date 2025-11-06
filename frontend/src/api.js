const API_BASE = import.meta.env.VITE_API_BASE ?? "http://127.0.0.1:8000";
const DEMO_HEADERS = { "X-Demo-User": "demo" };

export async function uploadTransactionsCsv(file) {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch(`${API_BASE}/api/files/transactions-csv`, {
    method: "POST",
    headers: DEMO_HEADERS, // keep — CORS ok 
    body: fd,              
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getOverview() {
  const res = await fetch(`${API_BASE}/api/me/overview`, { headers: DEMO_HEADERS });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getForecast(weeks = 12) {
  const res = await fetch(`${API_BASE}/api/forecast/balance?weeks=${weeks}`, { headers: DEMO_HEADERS });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getActions() {
  const res = await fetch(`${API_BASE}/api/actions`, { headers: DEMO_HEADERS });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function simulateWhatIf(query) {
  const res = await fetch(`${API_BASE}/api/what-if/simulate`, {
    method: "POST",
    headers: { ...DEMO_HEADERS, "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
