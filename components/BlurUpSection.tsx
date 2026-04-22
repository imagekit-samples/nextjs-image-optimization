"use client";

import { useState, useCallback } from "react";
import { Image, buildSrc } from "@imagekit/next";
import { SectionHeader } from "./SectionHeader";
import { CodeBlock } from "./CodeBlock";
import { IMAGES, URL_ENDPOINT } from "@/lib/imagekit";

const src = IMAGES.food;

const placeholderSrc = buildSrc({
  urlEndpoint: URL_ENDPOINT,
  src,
  transformation: [{ quality: 10, blur: 90 }],
});

const code = `import { Image, buildSrc } from '@imagekit/next';

const placeholderSrc = buildSrc({
  urlEndpoint,
  src: '/image.jpg',
  transformation: [{ quality: 10, blur: 90 }],
});

export default function ProductImage() {
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const imgRef = useCallback((img: HTMLImageElement | null) => {
    if (!img) return;
    if (img.complete) setShowPlaceholder(false);
  }, []);

  return (
    <Image
      src="/image.jpg"
      alt="Product image"
      width={800} height={600}
      ref={imgRef}
      onLoad={() => setShowPlaceholder(false)}
      style={showPlaceholder ? {
        backgroundImage: \`url(\${placeholderSrc})\`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      } : {}}
    />
  );
}`;

function WithPlaceholder() {
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const imgRef = useCallback((img: HTMLImageElement | null) => {
    if (!img) return;
    if (img.complete) setShowPlaceholder(false);
  }, []);

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        With blur-up placeholder
      </p>
      <div className="overflow-hidden rounded border border-gray-200 bg-gray-50">
        <Image
          src={src}
          alt="Image with blur placeholder"
          width={800}
          height={600}
          ref={imgRef}
          onLoad={() => setShowPlaceholder(false)}
          style={
            showPlaceholder
              ? {
                  backgroundImage: `url(${placeholderSrc})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }
              : {}
          }
          className="w-full h-auto"
        />
      </div>
      <p className="text-xs text-gray-500">
        Placeholder loads instantly via{" "}
        <code className="bg-gray-100 px-1 rounded">quality: 10, blur: 90</code>
      </p>
    </div>
  );
}

function WithoutPlaceholder() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        Without placeholder
      </p>
      <div className="overflow-hidden rounded border border-gray-200 bg-gray-50">
        <Image
          src={src}
          alt="Image without placeholder"
          width={800}
          height={600}
          className="w-full h-auto"
        />
      </div>
      <p className="text-xs text-gray-500">
        No placeholder — blank space until the image loads.
      </p>
    </div>
  );
}

export function BlurUpSection() {
  return (
    <section className="py-16 border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          number="04"
          title="Lazy loading + blur-up placeholder"
          subtitle="Show a blurred low-quality preview while the full image loads. Prevents layout shift and gives immediate visual feedback."
        />
        <div className="mb-6">
          <CodeBlock code={code} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <WithoutPlaceholder />
          <WithPlaceholder />
        </div>
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="text-xs border border-gray-200 rounded px-3 py-1.5 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Reload page
          </button>
          <p className="text-xs text-gray-400">
            DevTools → Network → throttle to Slow 3G to see the placeholder.
          </p>
        </div>
      </div>
    </section>
  );
}
