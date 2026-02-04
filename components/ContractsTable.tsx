import { EnergyContract } from "@/lib/contracts.types";

function fmtGBPFromPencePerKwh(pence: number) {
  // shown as p/kWh, but you might also want £/kWh or estimated annual cost
  return `${pence.toFixed(1)} p/kWh`;
}

export function ContractsTable({ items }: { items: EnergyContract[] }) {
  return (
    <div
      style={{
        overflowX: "auto",
        border: "1px solid #e5e7eb",
        borderRadius: 8,
      }}
    >
      <table
        style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}
      >
        <thead>
          <tr style={{ background: "#001A70" }}>
            {[
              "ID",
              "Customer",
              "Site",
              "Commodity",
              "Status",
              "Start",
              "End",
              "Annual kWh",
              "Unit rate",
            ].map((h) => (
              <th
                key={h}
                style={{
                  textAlign: "left",
                  padding: 12,
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((c) => (
            <tr key={c.id}>
              <td style={{ padding: 12, borderBottom: "1px solid #f1f5f9" }}>
                {c.id}
              </td>
              <td style={{ padding: 12, borderBottom: "1px solid #f1f5f9" }}>
                {c.customerName}
              </td>
              <td style={{ padding: 12, borderBottom: "1px solid #f1f5f9" }}>
                {c.site}
              </td>
              <td style={{ padding: 12, borderBottom: "1px solid #f1f5f9" }}>
                {c.commodity}
              </td>
              <td style={{ padding: 12, borderBottom: "1px solid #f1f5f9" }}>
                {c.status}
              </td>
              <td style={{ padding: 12, borderBottom: "1px solid #f1f5f9" }}>
                {c.startDate}
              </td>
              <td style={{ padding: 12, borderBottom: "1px solid #f1f5f9" }}>
                {c.endDate}
              </td>
              <td style={{ padding: 12, borderBottom: "1px solid #f1f5f9" }}>
                {c.annualKwh.toLocaleString()}
              </td>
              <td style={{ padding: 12, borderBottom: "1px solid #f1f5f9" }}>
                {fmtGBPFromPencePerKwh(c.unitRatePence)}
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan={9} style={{ padding: 12 }}>
                No results.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
