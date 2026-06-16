"use client"
import { useCallback, useState } from "react";
import { useEffect } from "react";
import { compressImage } from "@/lib/utils/image-compression";

export function usePhotoUpload() {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const reset = useCallback(() => {
    setPhotoFile(null);
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      setObjectUrl(null);
    }
    setPhotoPreview(null);
    setError(null);
    setIsLoading(false);
  }, []);

  const handleFile = useCallback(async (file: File) => {
    setError(null);
    if (!file) return;
    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setError("Format non supporté. JPG/PNG seulement.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Fichier trop volumineux (max 5MB).");
      return;
    }

    setIsLoading(true);
    try {
      const compressed = await compressImage(file, { maxSizeMB: 1, maxWidthOrHeight: 1920 });
      const outFile = new File([compressed], file.name, { type: compressed.type });
      setPhotoFile(outFile);
      const url = URL.createObjectURL(outFile);
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      setObjectUrl(url);
      setPhotoPreview(url);
    } catch (e) {
      console.error(e);
      setError("Impossible de compresser l'image.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  return {
    photoFile,
    photoPreview,
    error,
    isLoading,
    handleFile,
    reset,
  } as const;
}

// revoke any leftover object URL when the hook is no longer used
function useCleanupObjectUrl(url: string | null) {
  useEffect(() => {
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [url]);
}
