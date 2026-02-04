import { NextResponse } from "next/server";
import { mockContracts } from "@/lib/contracts.mock";
import { applyContractsQuery } from "@/lib/contracts.query";

export const dynamic = "force-dynamic"; // demo-friendly: no caching surprises

export function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q") ?? undefined;
  const commodity = (searchParams.get("commodity") ?? undefined) as
    | "electricity"
    | "gas"
    | undefined;

  const status = (searchParams.get("status") ?? undefined) as
    | "active"
    | "expired"
    | "pending"
    | undefined;

  const minKwhStr = searchParams.get("minKwh");
  const maxKwhStr = searchParams.get("maxKwh");

  const minKwh = minKwhStr ? Number(minKwhStr) : undefined;
  const maxKwh = maxKwhStr ? Number(maxKwhStr) : undefined;

  const filtered = applyContractsQuery(mockContracts, {
    q,
    commodity,
    status,
    minKwh: Number.isFinite(minKwh) ? minKwh : undefined,
    maxKwh: Number.isFinite(maxKwh) ? maxKwh : undefined,
  });

  return NextResponse.json({
    count: filtered.length,
    items: filtered,
  });
}
