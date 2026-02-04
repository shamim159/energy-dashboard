"use client";

import { useEffect, useMemo, useState } from "react";
import { EnergyContract, ContractStatus } from "@/lib/contracts.types";
import { ContractsTable } from "@/components/ContractsTable";
import { ContractsChart } from "@/components/ContractsChart";

type ApiResponse = { count: number; items: EnergyContract[] };

export default function Page() {
  const [q, setQ] = useState("");
  const [commodity, setCommodity] = useState<"" | "electricity" | "gas">("");
  const [status, setStatus] = useState<"" | ContractStatus>("");
  const [minKwh, setMinKwh] = useState<string>("");
  const [maxKwh, setMaxKwh] = useState<string>("");

  const [items, setItems] = useState<EnergyContract[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const queryString = useMemo(() => {
    const sp = new URLSearchParams();
    if (q.trim()) sp.set("q", q.trim());
    if (commodity) sp.set("commodity", commodity);
    if (status) sp.set("status", status);
    if (minKwh.trim()) sp.set("minKwh", minKwh.trim());
    if (maxKwh.trim()) sp.set("maxKwh", maxKwh.trim());
    return sp.toString();
  }, [q, commodity, status, minKwh, maxKwh]);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/contracts?${queryString}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: ApiResponse = await res.json();
        setItems(data.items);
      } catch (e: any) {
        if (e?.name !== "AbortError") setError(e?.message ?? "Failed to load");
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [queryString]);

  return (
    <main
      style={{
        padding: 24,
        maxWidth: 1100,
        margin: "0 auto",
        display: "grid",
        gap: 16,
      }}
    >
      <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>
        <span style={{ color: "#FF6A13" }}>Energy</span>{" "}
        <span style={{ color: "#001A70" }}>Dashboard Demo</span>
      </h1>

      {/* Filters */}
      <section
        style={{
          display: "grid",
          gap: 12,
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
        }}
      >
        <div>
          <label style={{ fontSize: 12, color: "#475569" }}>Search</label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ID, customer, site…"
            style={{
              width: "100%",
              padding: 10,
              border: "1px solid #001A70",
              borderRadius: 8,
            }}
          />
        </div>

        <div>
          <label style={{ fontSize: 12, color: "#475569" }}>Commodity</label>
          <select
            value={commodity}
            onChange={(e) => setCommodity(e.target.value as any)}
            style={{
              width: "100%",
              padding: 10,
              border: "1px solid #001A70",
              borderRadius: 8,
            }}
          >
            <option value="">All</option>
            <option value="electricity">electricity</option>
            <option value="gas">gas</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: 12, color: "#475569" }}>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            style={{
              width: "100%",
              padding: 10,
              border: "1px solid #001A70",
              borderRadius: 8,
            }}
          >
            <option value="">All</option>
            <option value="active">active</option>
            <option value="pending">pending</option>
            <option value="expired">expired</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: 12, color: "#475569" }}>Min kWh</label>
          <input
            value={minKwh}
            onChange={(e) => setMinKwh(e.target.value)}
            inputMode="numeric"
            placeholder="e.g. 100000"
            style={{
              width: "100%",
              padding: 10,
              border: "1px solid #001A70",
              borderRadius: 8,
            }}
          />
        </div>

        <div>
          <label style={{ fontSize: 12, color: "#475569" }}>Max kWh</label>
          <input
            value={maxKwh}
            onChange={(e) => setMaxKwh(e.target.value)}
            inputMode="numeric"
            placeholder="e.g. 500000"
            style={{
              width: "100%",
              padding: 10,
              border: "1px solid #001A70",
              borderRadius: 8,
            }}
          />
        </div>
      </section>

      <section
        style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr" }}
      >
        <ContractsChart items={items} />
        <div
          style={{ border: "1px solid #001A70", borderRadius: 8, padding: 12 }}
        >
          <div style={{ fontWeight: 600 }}>Stats</div>
          <div style={{ marginTop: 8 }}>
            Results: {loading ? "Loading…" : items.length}
          </div>
          {error && (
            <div style={{ marginTop: 8, color: "#b91c1c" }}>{error}</div>
          )}
          <div style={{ marginTop: 8, fontSize: 12, color: "#64748b" }}>
            Tip: try “London” or “C-1000”.
          </div>
        </div>
      </section>

      <ContractsTable items={items} />
    </main>
  );
}
