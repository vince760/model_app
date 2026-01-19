"use client";
import { Suspense } from "react";
import { OverviewCardsSkeleton } from "./_components/overview-cards/skeleton";
import { AccuracyCard } from "./_components/accuracy-card";

export default function Home() {
  return (
    <>
      <Suspense fallback={<OverviewCardsSkeleton />}></Suspense>
      <div className="mt-4 flex items-start gap-4">
        <div className="flex-1 items-center">
          <AccuracyCard />
        </div>
      </div>
    </>
  );
}
