"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Image } from "@imagekit/next";
import { SectionHeader } from "./SectionHeader";
import { CodeBlock } from "./CodeBlock";
import { IMAGES } from "@/lib/imagekit";

const src = IMAGES.food;

const code = `<Image
  src="/image.jpg"
  alt="Responsive demo"
  width={1600}
  height={1067}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  priority
/>`;

export function ResponsiveSection() {
  const [viewportWidth, setViewportWidth] = useState(0);
  const [currentSrc, setCurrentSrc] = useState("");
  const [srcset, setSrcset] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const updateInfo = useCallback(() => {
    setViewportWidth(window.innerWidth);
    const img = containerRef.current?.querySelector("img");
    if (img) {
      setCurrentSrc(img.currentSrc || "");
      setSrcset(img.srcset || "");
    }
  }, []);

  useEffect(() => {
    updateInfo();
    window.addEventListener("resize", updateInfo);
    return () => window.removeEventListener("resize", updateInfo);
  }, [updateInfo]);

  const currentWidth = currentSrc.match(/w-(\d+)/)?.[1] || "—";

  const srcsetEntries = srcset
    ? srcset.split(", ").map((entry) => {
        const [url, descriptor] = entry.split(" ");
        const width = url.match(/w-(\d+)/)?.[1] || "?";
        const isActive = url === currentSrc;
        return { width, descriptor, isActive };
      })
    : [];

  return (
    <section className="py-16 border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          number="03"
          title="Responsive images"
          subtitle="The sizes prop tells the browser which width to request. ImageKit generates and delivers each variant from the CDN."
        />
        <div className="mb-6">
          <CodeBlock code={code} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div ref={containerRef} className="overflow-hidden rounded border border-gray-200 bg-gray-50">
            <Image
              src={src}
              alt="Responsive demo"
              width={1600}
              height={1067}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority
              onLoad={updateInfo}
              className="w-full h-auto"
            />
          </div>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div>
                <p className="text-xs text-gray-500">Viewport width</p>
                <p className="text-lg font-mono font-medium tabular-nums">
                  {viewportWidth}px
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">sizes attribute</p>
                <p className="text-xs font-mono text-gray-700">
                  (max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Currently selected variant</p>
                <p className="text-sm font-mono font-medium">
                  w-{currentWidth}
                </p>
              </div>
            </div>
            {srcsetEntries.length > 0 && (
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-xs text-gray-500 mb-2">
                  Generated srcset ({srcsetEntries.length} variants)
                </p>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {srcsetEntries.map((entry) => (
                    <p
                      key={entry.descriptor}
                      className={`text-xs font-mono ${
                        entry.isActive
                          ? "text-green-600 font-semibold"
                          : "text-gray-500"
                      }`}
                    >
                      {entry.isActive && "→ "}w-{entry.width} {entry.descriptor}
                    </p>
                  ))}
                </div>
              </div>
            )}
            <p className="text-xs text-gray-400">
              Resize the browser window — the selected variant updates live.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
