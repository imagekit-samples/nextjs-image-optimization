export interface Measurement {
  bytes: number;
  contentType: string;
  loadTimeMs: number;
}

export async function measureImage(url: string): Promise<Measurement> {
  const start = performance.now();
  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
    },
  });
  const elapsed = performance.now() - start;

  const contentType = res.headers.get("content-type") || "unknown";
  const contentLength = res.headers.get("content-length");

  if (contentLength) {
    res.body?.cancel();
    return {
      bytes: parseInt(contentLength, 10),
      contentType,
      loadTimeMs: Math.round(elapsed),
    };
  }

  const blob = await res.blob();
  return {
    bytes: blob.size,
    contentType,
    loadTimeMs: Math.round(elapsed),
  };
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

export function formatContentType(ct: string): string {
  return ct.replace("image/", "").toUpperCase();
}
