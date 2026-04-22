"use client";

import { SectionHeader } from "./SectionHeader";
import { ImageCompare } from "./ImageCompare";
import { getRawUrl, getImageUrl, IMAGES } from "@/lib/imagekit";
import { CodeBlock } from "./CodeBlock";

const src = IMAGES.food;

const code = `// Before — raw image, no optimization
<img src="https://ik.imagekit.io/.../image.jpg?tr=orig-true" />

// After — ImageKit SDK, automatic AVIF/WebP
import { Image } from '@imagekit/next';
<Image src="/image.jpg" width={800} height={600} alt="..." />`;

export function FormatSection() {
  return (
    <section className="py-16 border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          number="01"
          title="Automatic format conversion"
          subtitle="ImageKit reads the browser's Accept header and automatically delivers AVIF in Chrome, WebP in Safari."
        />
        <div className="mb-6">
          <CodeBlock code={code} />
        </div>
        <ImageCompare
          left={{
            label: "Raw JPEG (orig-true)",
            src: src,
            transformation: [{ raw: "orig-true" }],
            measureUrl: getRawUrl(src),
          }}
          right={{
            label: "ImageKit optimized",
            src: src,
            measureUrl: getImageUrl(src),
          }}
          showStats
        />
        <p className="mt-4 text-xs text-gray-400">
          Open DevTools → Network → Img to verify the Content-Type header on
          each request.
        </p>
      </div>
    </section>
  );
}
