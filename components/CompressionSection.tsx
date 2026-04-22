"use client";

import { useState, useEffect, useRef } from "react";
import { Image } from "@imagekit/next";
import { SectionHeader } from "./SectionHeader";
import { StatBadge } from "./StatBadge";
import { CodeBlock } from "./CodeBlock";
import { IMAGES, getImageUrl, getRawUrl } from "@/lib/imagekit";
import { measureImage, formatBytes, type Measurement } from "@/lib/measure";

const src = IMAGES.food;

const qualities = [100, 80, 60, 30];

const code = `// Higher quality for product detail
<Image src="/image.jpg" width={800} height={600}
  transformation={[{ quality: 90 }]} />

// Lower quality for listing thumbnails
<Image src="/image.jpg" width={300} height={300}
  transformation={[{ quality: 60 }]} />`;

function QualityCard({ quality }: { quality: number }) {
  const [m, setM] = useState<Measurement | null>(null);
  const url = getImageUrl(src, [{ quality }]);

  useEffect(() => {
    measureImage(url).then(setM).catch(console.error);
  }, [url]);

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded border border-gray-200 bg-gray-50 aspect-square">
        <Image
          src={src}
          transformation={[{ quality, width: 400 }]}
          alt={`Quality ${quality}`}
          width={400}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-mono font-medium">q-{quality}</span>
        {m && (
          <span className="text-xs text-gray-500 font-mono tabular-nums">
            {formatBytes(m.bytes)}
          </span>
        )}
        {quality === 80 && (
          <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
            default
          </span>
        )}
      </div>
    </div>
  );
}

function QualitySlider() {
  const [quality, setQuality] = useState(80);
  const [m, setM] = useState<Measurement | null>(null);
  const [rawBytes, setRawBytes] = useState<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    measureImage(getRawUrl(src)).then((r) => setRawBytes(r.bytes)).catch(console.error);
  }, []);

  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const url = getImageUrl(src, [{ quality }]);
      measureImage(url).then(setM).catch(console.error);
    }, 200);
    return () => clearTimeout(timerRef.current);
  }, [quality]);

  const savings = rawBytes && m ? Math.round((1 - m.bytes / rawBytes) * 100) : null;

  return (
    <div className="mt-8 border border-gray-200 rounded-lg p-6">
      <h3 className="text-sm font-medium mb-4">Interactive quality explorer</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative overflow-hidden rounded border border-gray-200 bg-gray-50 aspect-square">
          <Image
            src={src}
            transformation={[{ quality, width: 600 }]}
            alt={`Quality ${quality}`}
            width={600}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center space-y-4">
          <div>
            <label className="text-xs text-gray-500 block mb-2">
              Quality: <span className="font-mono font-medium text-foreground text-lg">{quality}</span>
            </label>
            <input
              type="range"
              min={1}
              max={100}
              step={1}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full accent-gray-900"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {m ? (
              <>
                <StatBadge label="Size" value={formatBytes(m.bytes)} />
                {savings !== null && savings > 0 && (
                  <StatBadge label="vs. raw" value={`${savings}% smaller`} tone="success" />
                )}
              </>
            ) : (
              <div className="border border-gray-200 rounded-lg px-4 py-3 min-w-[120px] animate-pulse">
                <div className="h-3 bg-gray-100 rounded w-10 mb-2" />
                <div className="h-4 bg-gray-100 rounded w-14" />
              </div>
            )}
          </div>
          <p className="text-xs text-gray-400">
            Drag the slider — the image updates instantly, the size measurement
            follows with a short debounce.
          </p>
        </div>
      </div>
    </div>
  );
}

export function CompressionSection() {
  return (
    <section className="py-16 border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          number="02"
          title="Compression"
          subtitle="ImageKit compresses images automatically. The default quality is 80. Override it per-image when you need finer control."
        />
        <div className="mb-6">
          <CodeBlock code={code} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {qualities.map((q) => (
            <QualityCard key={q} quality={q} />
          ))}
        </div>
        <QualitySlider />
      </div>
    </section>
  );
}
