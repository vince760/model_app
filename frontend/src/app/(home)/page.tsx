"use client";
import { useState } from "react";
import { PaymentsOverview } from "@/components/Charts/payments-overview";
import { UsedDevices } from "@/components/Charts/used-devices";
import { WeeksProfit } from "@/components/Charts/weeks-profit";
import { TopChannels } from "@/components/Tables/top-channels";
import { TopChannelsSkeleton } from "@/components/Tables/top-channels/skeleton";
import { createTimeFrameExtractor } from "@/utils/timeframe-extractor";
import { Suspense } from "react";
import { ChatsCard } from "./_components/chats-card";
import { OverviewCardsGroup } from "./_components/overview-cards";
import { OverviewCardsSkeleton } from "./_components/overview-cards/skeleton";
import { RegionLabels } from "./_components/region-labels";
import { Button } from "@/components/ui-elements/button";
import { OverviewCard } from "./_components/overview-cards/card";
import { AccuracyCard } from "./_components/accuracy-card";
type PropsType = {
  searchParams: Promise<{
    selected_time_frame?: string;
  }>;
};

export default function Home({ searchParams }: PropsType) {
  const [accuracy, setAccuracy] = useState<string>("");

  function handleGetModelAccuracy() {
    setAccuracy("95.2%");
  }

  return (
    <>
      <Suspense fallback={<OverviewCardsSkeleton />}>
        {/* <OverviewCardsGroup /> */}
      </Suspense>
      <div className="mt-4 flex items-start gap-4">
        <Button
          shape="rounded"
          variant="primary"
          label="Get Model Accuracy"
          onClick={handleGetModelAccuracy}
        />

        <div className="flex-1 items-center">
          <AccuracyCard accuracy={accuracy} />
        </div>
      </div>
    </>
  );
}
