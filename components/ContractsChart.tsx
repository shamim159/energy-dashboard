"use client";

import { EnergyContract } from "@/lib/contracts.types";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

function groupByCommodity(items: EnergyContract[]) {
  const sums = new Map<string, number>();
  for (const c of items) {
    sums.set(c.commodity, (sums.get(c.commodity) ?? 0) + c.annualKwh);
  }
  return Array.from(sums.entries()).map(([commodity, totalKwh]) => ({
    commodity,
    totalKwh,
  }));
}

export function ContractsChart({ items }: { items: EnergyContract[] }) {
  const data = groupByCommodity(items);

  return (
    <div
      style={{
        height: 280,
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        padding: 12,
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 8 }}>
        Annual kWh by commodity
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="commodity" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalKwh" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.commodity === "electricity" ? "#001A70" : "#FF6A13"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
