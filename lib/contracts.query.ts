import { EnergyContract, ContractStatus } from "./contracts.types";

export type ContractsQuery = {
  q?: string; // search: id/customer/site
  commodity?: "electricity" | "gas";
  status?: ContractStatus;
  minKwh?: number;
  maxKwh?: number;
};

export function applyContractsQuery(
  contracts: EnergyContract[],
  query: ContractsQuery
) {
  const q = (query.q ?? "").trim().toLowerCase();

  return contracts.filter((c) => {
    if (q) {
      const hay = `${c.id} ${c.customerName} ${c.site}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (query.commodity && c.commodity !== query.commodity) return false;
    if (query.status && c.status !== query.status) return false;

    if (typeof query.minKwh === "number" && c.annualKwh < query.minKwh)
      return false;
    if (typeof query.maxKwh === "number" && c.annualKwh > query.maxKwh)
      return false;

    return true;
  });
}
