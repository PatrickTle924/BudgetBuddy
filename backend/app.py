# this file handles our endpoints and serves as the main backend

from datetime import date, timedelta
from collections import defaultdict
from typing import Dict, Any, List, Optional

from fastapi import FastAPI, UploadFile, File, HTTPException, Header, Depends
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Fin App (Minimal)", version="0.0.1")

# add CORS for Vite dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#placeholde rauth
def get_user_id(x_demo_user: Optional[str] = Header(default="demo", alias="X-Demo-User")) -> str:
    return x_demo_user or "demo"

# --- in-memory storage (replace later if you want) ---
USER_TXNS: Dict[str, List[Dict[str, Any]]] = defaultdict(list)  # each txn: {"date": "...", "amount": float, "desc": str}

# ------------------ Endpoints ------------------

#ping backend
@app.get("/health")
def health():
    return {"ok": True}

# 
@app.post("/api/files/transactions-csv")
async def upload_csv(file: UploadFile = File(...), user_id: str = Depends(get_user_id)):
    """
    Accept a CSV file upload. For now we just read it and stash the raw rows in memory.
    Can call from front end
    """
    if not file.filename.lower().endswith(".csv"):
        raise HTTPException(status_code=400, detail="Please upload a CSV file.")

    content = await file.read()
    text = content.decode("utf-8", errors="ignore")

    # simple MVP parsing: split by lines, assume header on first line, comma-separated
    lines = [ln for ln in text.splitlines() if ln.strip()]
    if len(lines) <= 1:
        raise HTTPException(status_code=400, detail="CSV appears empty.")

    header = [h.strip() for h in lines[0].split(",")]
    # try to guess columns
    # acceptable aliases: Date/Transaction Date, Amount, Description/Merchant/Payee
    def col_idx(names):
        for n in names:
            if n in header:
                return header.index(n)
        return None

    i_date = col_idx(["Date", "Transaction Date", "date"])
    i_amt  = col_idx(["Amount", "Transaction Amount", "amount"])
    i_desc = col_idx(["Description", "Merchant", "Payee"])

    # if we can’t find key columns, just store nothing (still returns success)
    added = 0
    for row in lines[1:]:
        parts = [p.strip() for p in row.split(",")]
        try:
            d = parts[i_date] if i_date is not None and i_date < len(parts) else None
            a_raw = parts[i_amt] if i_amt is not None and i_amt < len(parts) else "0"
            desc = parts[i_desc] if i_desc is not None and i_desc < len(parts) else ""
            # very lenient float cast
            amt = float(a_raw.replace(",", "")) if a_raw else 0.0
            USER_TXNS[user_id].append({"date": d, "amount": amt, "desc": desc})
            added += 1
        except Exception:
            # ignore malformed line
            pass

    return {"rows_ingested": added}

@app.get("/api/me/overview")
def overview(user_id: str = Depends(get_user_id)):
    """
    Return safe-to-spend and next dip date.
    TODO: replace placeholders with function to calc STS
    """
    return {
        "safeToSpend": 482.14,        # placeholder
        "nextDipDate": None,          # e.g., "2025-11-12" later
        "lastUpdated": date.today().isoformat(),
    }

@app.get("/api/forecast/balance")
def forecast(weeks: int = 12, user_id: str = Depends(get_user_id)):
    """
    Return a trivial flat forecast so your sparkline works.
    Later, compute from USER_TXNS.
    """
    weeks = max(1, min(52, weeks))
    today = date.today()
    points = []
    bal = 1000.0  # start placeholder balance
    for i in range(weeks * 7):
        points.append({"date": (today + timedelta(days=i)).isoformat(), "balance": round(bal, 2)})
        # small wiggle so the chart isn’t perfectly flat
        if i % 7 == 0:
            bal -= 25
    return {"points": points}

@app.get("/api/actions")
def actions(user_id: str = Depends(get_user_id)):
    """
    Return a couple of hardcoded action cards so your ActionList renders.
    Replace later with simple heuristics.
    """
    return [
        {
            "id": "buffer-1",
            "type": "buffer",
            "title": "Build a safety buffer",
            "body": "You may dip below $0 next month. Moving ~$300 to checking would prevent it.",
            "impact": "Avoids a projected negative balance",
            "suggestedChange": "Transfer +$300 to checking this week"
        },
        {
            "id": "subs-1",
            "type": "subscriptions",
            "title": "Review small subscriptions",
            "body": "We noticed several small recurring charges (e.g., Netflix, Spotify). Consider canceling unused ones.",
            "impact": "Reduce drip expenses"
        }
    ]

@app.post("/api/what-if/simulate")
def what_if(payload: Dict[str, Any], user_id: str = Depends(get_user_id)):
    """
    Accepts: { "query": "Rent +$200 starting 2025-12-01" }
    For now, echo back a stub result so your WhatIfPanel works.
    """
    q = (payload or {}).get("query", "")
    return {
        "summary": f"Simulated: {q or 'no change'}",
        "dipsPrevented": 0,
        "minBalanceDelta": 0.0,
        "cashflowDelta": 0.0
    }

