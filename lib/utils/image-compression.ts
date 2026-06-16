export async function compressImage(file: File, options: { maxSizeMB?: number; maxWidthOrHeight?: number } = {}) {
  const { default: imageCompression } = await import("browser-image-compression");
  const opts = {
    maxSizeMB: options.maxSizeMB ?? 1,
    maxWidthOrHeight: options.maxWidthOrHeight ?? 1920,
    useWebWorker: true,
  };
  // imageCompression returns a Blob
  const compressed = await imageCompression(file, opts as any);
  return compressed as Blob;
}
