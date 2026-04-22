import { buildSrc } from "@imagekit/next";

export const URL_ENDPOINT = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!;

const IMG_BASE = "/example_images/nextjs image optimization";

export const IMAGES = {
  food: `${IMG_BASE}/food.jpg`,
  groupPhoto: `${IMG_BASE}/group-photo.jpg`,
  personLeft: `${IMG_BASE}/person-to-left.jpg`,
  dogCat: `${IMG_BASE}/dog-cat.jpg`,
  shoes: `${IMG_BASE}/on-white-bg.jpg`,
  product: `${IMG_BASE}/product.jpg`,
};

export type Transformation = Record<string, string | number | boolean>;

export function getImageUrl(
  src: string,
  transformation?: Transformation[]
): string {
  return buildSrc({
    urlEndpoint: URL_ENDPOINT,
    src,
    transformation,
  });
}

export function getRawUrl(src: string): string {
  return `${URL_ENDPOINT}${src}?tr=orig-true`;
}
