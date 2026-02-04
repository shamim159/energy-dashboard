export type ContractStatus = "active" | "expired" | "pending";

export type EnergyContract = {
  id: string;
  customerName: string;
  site: string;
  commodity: "electricity" | "gas";
  startDate: string; // ISO yyyy-mm-dd
  endDate: string; // ISO yyyy-mm-dd
  annualKwh: number;
  unitRatePence: number; // p/kWh
  status: ContractStatus;
};
