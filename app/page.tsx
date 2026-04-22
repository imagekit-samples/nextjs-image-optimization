"use client";

import { useEffect } from "react";
import { getImageUrl, IMAGES } from "@/lib/imagekit";
import { SummaryTable } from "@/components/SummaryTable";
import { FormatSection } from "@/components/FormatSection";
import { CompressionSection } from "@/components/CompressionSection";
import { ResponsiveSection } from "@/components/ResponsiveSection";
import { BlurUpSection } from "@/components/BlurUpSection";
import { SmartCropSection } from "@/components/SmartCropSection";
import { AISection } from "@/components/AISection";

export default function Home() {
  useEffect(() => {
    const bgRemoveUrl = getImageUrl(IMAGES.shoes, [
      { width: 500, aiRemoveBackground: true },
    ]);
    const genFillUrl = getImageUrl(IMAGES.product, [
      { width: 1080, height: 1920, cropMode: "pad_resize", raw: "bg-genfill" },
    ]);
    fetch(bgRemoveUrl, { method: "HEAD" }).catch(() => {});
    fetch(genFillUrl, { method: "HEAD" }).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Next.js Image Optimization Demo
        </h1>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl">
          Every section below applies one technique from the{" "}
          <a
            href="https://imagekit.io/blog/nextjs-image-optimization"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-900 transition-colors"
          >
            Next.js Image Optimization with ImageKit
          </a>{" "}
          blog.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Open DevTools → Network → Img to see what&apos;s actually being
          delivered.
        </p>
      </div>

      <SummaryTable />
      <FormatSection />
      <CompressionSection />
      <ResponsiveSection />
      <BlurUpSection />
      <SmartCropSection />
      <AISection />

      {/* Footer */}
      <div className="border-t border-gray-200 py-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex gap-4">
            <a
              href="https://imagekit.io/docs/integration/nextjs"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors"
            >
              SDK docs
            </a>
            <a
              href="https://imagekit.io/docs/image-transformation"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors"
            >
              Transformation docs
            </a>
          </div>
          <a
            href="https://imagekit.io/blog/nextjs-image-optimization"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition-colors"
          >
            Read the blog post →
          </a>
        </div>
      </div>
    </div>
  );
}
