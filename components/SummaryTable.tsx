"use client";

import { useEffect, useState } from "react";
import { measureImage, formatBytes, type Measurement } from "@/lib/measure";
import { getRawUrl, getImageUrl, IMAGES } from "@/lib/imagekit";

const src = IMAGES.food;

const variants = [
  { name: "Raw (orig-true)", url: getRawUrl(src), notes: "No optimization — baseline" },
  { name: "ImageKit default", url: getImageUrl(src), notes: "Auto format + default q-80" },
  { name: "Resized (w-800)", url: getImageUrl(src, [{ width: 800 }]), notes: "Format + compression + resize" },
  { name: "Resized (w-400)", url: getImageUrl(src, [{ width: 400 }]), notes: "Thumbnail size" },
  { name: "Resized (w-800) + q-60", url: getImageUrl(src, [{ width: 800, quality: 60 }]), notes: "Resize + aggressive compression" },
];

export function SummaryTable() {
  const [results, setResults] = useState<(Measurement | null)[]>(
    () => new Array(variants.length).fill(null)
  );

  useEffect(() => {
    variants.forEach((v, i) => {
      measureImage(v.url)
        .then((m) =>
          setResults((prev) => {
            const next = [...prev];
            next[i] = m;
            return next;
          })
        )
        .catch(console.error);
    });
  }, []);

  const rawBytes = results[0]?.bytes ?? 0;

  return (
    <section className="py-16 border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl font-bold tracking-tight mb-1">
          Comparison summary
        </h2>
        <p className="text-gray-500 mb-8">
          Same source image, each row stacks more optimization. Sizes measured
          via HTTP Content-Length.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 pr-6 font-normal text-gray-500">Variant</th>
                <th className="text-left py-2 pr-6 font-normal text-gray-500">Format</th>
                <th className="text-left py-2 pr-6 font-normal text-gray-500">Size</th>
                <th className="text-left py-2 pr-6 font-normal text-gray-500">Savings vs raw</th>
                <th className="text-left py-2 font-normal text-gray-500">Notes</th>
              </tr>
            </thead>
            <tbody>
              {variants.map((v, i) => {
                const m = results[i];
                const savings =
                  rawBytes && m ? Math.round((1 - m.bytes / rawBytes) * 100) : 0;

                return (
                  <tr key={v.name} className="border-b border-gray-100">
                    <td className="py-2 pr-6 font-medium">{v.name}</td>
                    <td className="py-2 pr-6 font-mono text-xs">
                      {m ? m.contentType.replace("image/", "").toUpperCase() : (
                        <span className="inline-block h-4 w-10 bg-gray-100 rounded animate-pulse" />
                      )}
                    </td>
                    <td className="py-2 pr-6 font-mono text-xs tabular-nums">
                      {m ? formatBytes(m.bytes) : (
                        <span className="inline-block h-4 w-16 bg-gray-100 rounded animate-pulse" />
                      )}
                    </td>
                    <td className="py-2 pr-6">
                      {m ? (
                        i === 0 ? (
                          <span className="text-xs text-gray-400">—</span>
                        ) : savings > 0 ? (
                          <span className="text-xs font-semibold text-green-600">
                            {savings}% smaller
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">{savings}%</span>
                        )
                      ) : (
                        <span className="inline-block h-4 w-16 bg-gray-100 rounded animate-pulse" />
                      )}
                    </td>
                    <td className="py-2 text-xs text-gray-500">{v.notes}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
