"use client";

import { useState } from "react";
import { Image } from "@imagekit/next";
import { SectionHeader } from "./SectionHeader";
import { CodeBlock } from "./CodeBlock";
import { IMAGES } from "@/lib/imagekit";

const bgRemoveCode = `<Image
  src="/on-white-bg.jpg"
  alt="Background removed"
  width={500} height={500}
  transformation={[{ aiRemoveBackground: true }]}
/>`;

const genFillCode = `<Image
  src="/product.jpg"
  alt="Mobile hero"
  width={1080} height={1920}
  transformation={[{
    width: 1080, height: 1920,
    cropMode: 'pad_resize',
    raw: 'bg-genfill',
  }]}
/>`;

function BgRemoveSubsection() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Background removal</h3>
      <div className="mb-4">
        <CodeBlock code={bgRemoveCode} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Original
          </p>
          <div className="overflow-hidden rounded border border-gray-200 bg-gray-50 aspect-square">
            <Image
              src={IMAGES.shoes}
              alt="Original product"
              width={500}
              height={500}
              transformation={[{ width: 500 }]}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Background removed
          </p>
          <div className="overflow-hidden rounded border border-gray-200 bg-[repeating-conic-gradient(#f3f4f6_0%_25%,#fff_0%_50%)_0_0/20px_20px] aspect-square">
            <Image
              src={IMAGES.shoes}
              alt="Background removed"
              width={500}
              height={500}
              transformation={[{ width: 500, aiRemoveBackground: true }]}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function GenFillSubsection() {
  const [prompt, setPrompt] = useState("");
  const [activePrompt, setActivePrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setActivePrompt(prompt);
  };

  const rawValue = activePrompt
    ? `bg-genfill-prompt-${encodeURIComponent(activePrompt)}`
    : "bg-genfill";

  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-4">
        Generative fill: square → 9:16
      </h3>
      <div className="mb-4">
        <CodeBlock code={genFillCode} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Original
          </p>
          <div className="overflow-hidden rounded border border-gray-200 bg-gray-50">
            <Image
              src={IMAGES.product}
              alt="Original product"
              width={500}
              height={500}
              transformation={[{ width: 500 }]}
              className="w-full h-auto"
            />
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Extended to 9:16 with AI fill
          </p>
          <div className="relative overflow-hidden rounded border border-gray-200 bg-gray-50">
            <Image
              src={IMAGES.product}
              alt="Generative fill"
              width={1080}
              height={1920}
              transformation={[
                {
                  width: 1080,
                  height: 1920,
                  cropMode: "pad_resize",
                  raw: rawValue,
                },
              ]}
              onLoad={() => setLoading(false)}
              className="w-full h-auto"
            />
            {loading && (
              <div className="absolute inset-0 bg-gray-50/80 flex items-center justify-center">
                <p className="text-sm text-gray-500 animate-pulse">
                  Generating with AI…
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AISection() {
  return (
    <section className="py-16 border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          number="06"
          title="AI transformations"
          subtitle="Background removal and generative fill via URL parameters. Useful for product imagery and responsive layouts."
        />
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-500 mb-8">
          <p className="font-medium text-gray-700 mb-1">
            AI transforms are in beta
          </p>
          <p>
            First request takes 30-60 seconds while ImageKit generates the
            result. After that, it&apos;s served from cache instantly.
          </p>
        </div>
        <BgRemoveSubsection />
        <GenFillSubsection />
      </div>
    </section>
  );
}
