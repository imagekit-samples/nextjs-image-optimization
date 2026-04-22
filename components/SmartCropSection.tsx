"use client";

import { Image } from "@imagekit/next";
import { SectionHeader } from "./SectionHeader";
import { CodeBlock } from "./CodeBlock";
import { IMAGES } from "@/lib/imagekit";

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-10 first:mt-0">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}

function CropCard({
  src,
  label,
  transformation,
  code: codeStr,
}: {
  src: string;
  label: string;
  transformation: Record<string, string | number | boolean>[];
  code: string;
}) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        {label}
      </p>
      <div className="overflow-hidden rounded border border-gray-200 bg-gray-50 aspect-square">
        <Image
          src={src}
          transformation={transformation}
          alt={label}
          width={400}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>
      <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded block">
        {codeStr}
      </code>
    </div>
  );
}

const faceCropCode = `<Image
  src="/group-photo.jpg"
  width={400} height={400}
  transformation={[{
    width: 400, height: 400, focus: 'face',
  }]}
/>`;

const autoCropCode = `<Image
  src="/person-to-left.jpg"
  width={400} height={400}
  transformation={[{
    width: 400, height: 400, focus: 'auto',
  }]}
/>`;

const objectCropCode = `// Focus on a specific object
<Image
  src="/dog-cat.jpg"
  width={400} height={400}
  transformation={[{
    width: 400, height: 400, focus: 'dog',
  }]}
/>`;

export function SmartCropSection() {
  return (
    <section className="py-16 border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          number="05"
          title="Smart crop"
          subtitle="Standard cropping cuts from the center. ImageKit detects faces and subjects and crops around them instead."
        />

        <SubSection title="Face crop: fo-face">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <CropCard
              src={IMAGES.groupPhoto}
              label="Center crop (default)"
              transformation={[{ width: 400, height: 400 }]}
              code="w-400,h-400"
            />
            <CropCard
              src={IMAGES.groupPhoto}
              label="Face-aware crop"
              transformation={[{ width: 400, height: 400, focus: "face" }]}
              code="w-400,h-400,fo-face"
            />
          </div>
          <CodeBlock code={faceCropCode} />
        </SubSection>

        <SubSection title="Auto smart crop: fo-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <CropCard
              src={IMAGES.personLeft}
              label="Center crop: default"
              transformation={[{ width: 400, height: 400 }]}
              code="w-400,h-400"
            />
            <CropCard
              src={IMAGES.personLeft}
              label="Smart crop"
              transformation={[{ width: 400, height: 400, focus: "auto" }]}
              code="w-400,h-400,fo-auto"
            />
          </div>
          <CodeBlock code={autoCropCode} />
        </SubSection>

        <SubSection title="Object-aware crop: fo-{object}">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <CropCard
              src={IMAGES.dogCat}
              label="Center crop (default)"
              transformation={[{ width: 400, height: 400 }]}
              code="w-400,h-400"
            />
            <CropCard
              src={IMAGES.dogCat}
              label="Focus: dog"
              transformation={[{ width: 400, height: 400, focus: "dog" }]}
              code="w-400,h-400,fo-dog"
            />
            <CropCard
              src={IMAGES.dogCat}
              label="Focus: cat"
              transformation={[{ width: 400, height: 400, focus: "cat" }]}
              code="w-400,h-400,fo-cat"
            />
          </div>
          <CodeBlock code={objectCropCode} />
        </SubSection>
      </div>
    </section>
  );
}
