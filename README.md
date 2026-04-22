# Next.js Image Optimization

Demo app for the blog post: **[Next.js Image Optimization with ImageKit](https://imagekit.io/blog/nextjs-image-optimization/)**.

Demonstrates automatic AVIF/WebP delivery, compression tuning, responsive srcset generation, blur-up placeholders, smart cropping, and AI transformations all via URL-based transformations with [ImageKit](https://imagekit.io/) and the [imagekit/next](https://imagekit.io/docs/integration/nextjs) SDK. Every section shows real file sizes so you can see the savings.

## What's on the page

| Section | What it shows |
|---------|---------------|
| Summary table | Auto-populated comparison of 5 variants including format, size, and savings % |
| 01 — Format conversion | Raw JPEG vs ImageKit auto-optimized |
| 02 — Compression | Quality 100, 80, 60, 30 comparison + interactive quality slider |
| 03 — Responsive images | `sizes` prop + live viewport/srcset/currentSrc indicator |
| 04 — Blur-up placeholder | Side-by-side with and without `buildSrc` blur placeholder |
| 05 — Smart crop | Face crop: `fo-face`, auto crop: `fo-auto`, object-aware crop: `fo-dog`/`fo-cat`|
| 06 — AI transformations | Background removal: `aiRemoveBackground` + generative fill: `bg-genfill` with prompt input |

## Setup

1. Clone the repo and navigate to this folder:

   ```bash
   cd nextjs-image-optimization
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env.local` in the project root:

   ```
   NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT` | Your ImageKit URL endpoint, e.g. `https://ik.imagekit.io/your_imagekit_id` |

## Customization

To use different source images, update the paths in `lib/imagekit.ts` under the `IMAGES` object. The images should be uploaded to your ImageKit media library.

## Related

- [Next.js Image Optimization with ImageKit](https://imagekit.io/blog/nextjs-image-optimization/)
- [@imagekit/next SDK docs](https://imagekit.io/docs/integration/nextjs)
- [ImageKit Transformation docs](https://imagekit.io/docs/image-transformation)
- [Next.js Video Optimization demo](https://github.com/imagekit-samples/nextjs-video-optimization)
- [Next.js Video Background demo](https://github.com/imagekit-samples/nextjs-video-background)
