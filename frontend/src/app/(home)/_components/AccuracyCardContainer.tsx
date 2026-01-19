// src/app/(home)/_components/AccuracyCardContainer.tsx
import { AccuracyCard } from "./accuracy-card";

type Meta = { years: string[]; platforms: string[]; genres: string[] };

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:5000";

export default async function AccuracyCardContainer({
  accuracy,
}: {
  accuracy: string;
}) {
  const res = await fetch(`${API_BASE}metadata`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load metadata");

  const meta = (await res.json()) as Meta;

  return <AccuracyCard accuracy={accuracy} />;
}
