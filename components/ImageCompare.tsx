"use client";

import { useEffect, useState } from "react";
import { Image } from "@imagekit/next";
import { measureImage, formatBytes, formatContentType, type Measurement } from "@/lib/measure";
import { StatBadge } from "./StatBadge";

interface Side {
  label: string;
  src: string;
  transformation?: Record<string, string | number | boolean>[];
  measureUrl: string;
}

interface ImageCompareProps {
  left: Side;
  right: Side;
  aspect?: "square" | "video" | "auto";
  showStats?: boolean;
}

function Skeleton() {
  return (
    <div className="border border-gray-200 rounded-lg px-4 py-3 min-w-[100px] animate-pulse">
      <div className="h-3 bg-gray-100 rounded w-10 mb-2" />
      <div className="h-4 bg-gray-100 rounded w-14" />
    </div>
  );
}

function CompareCard({
  side,
  aspect,
  showStats,
}: {
  side: Side;
  aspect: string;
  showStats: boolean;
}) {
  const [measurement, setMeasurement] = useState<Measurement | null>(null);

  useEffect(() => {
    if (showStats) {
      measureImage(side.measureUrl).then(setMeasurement).catch(console.error);
    }
  }, [side.measureUrl, showStats]);

  const aspectClass =
    aspect === "square"
      ? "aspect-square"
      : aspect === "video"
        ? "aspect-video"
        : "";

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        {side.label}
      </p>
      <div
        className={`relative overflow-hidden rounded border border-gray-200 bg-gray-50 ${aspectClass}`}
      >
        <Image
          src={side.src}
          transformation={side.transformation}
          alt={side.label}
          width={800}
          height={800}
          className="w-full h-full object-cover"
        />
      </div>
      {showStats && (
        <div className="flex flex-wrap gap-2">
          {measurement ? (
            <>
              <StatBadge
                label="Format"
                value={formatContentType(measurement.contentType)}
              />
              <StatBadge
                label="Size"
                value={formatBytes(measurement.bytes)}
              />
            </>
          ) : (
            <>
              <Skeleton />
              <Skeleton />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export function ImageCompare({
  left,
  right,
  aspect = "auto",
  showStats = false,
}: ImageCompareProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CompareCard side={left} aspect={aspect} showStats={showStats} />
      <CompareCard side={right} aspect={aspect} showStats={showStats} />
    </div>
  );
}
