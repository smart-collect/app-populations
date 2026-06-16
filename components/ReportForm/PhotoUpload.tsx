"use client"
import React from "react";
import CameraCapture from "@/components/Camera/CameraCapture";

export default function PhotoUpload({
  photoPreview,
  isLoading,
  error,
  onFile,
  onReset,
}: {
  photoPreview?: string | null;
  isLoading?: boolean;
  error?: string | null;
  onFile: (f: File) => void;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col items-center">
      {!photoPreview ? (
        <CameraCapture onSelect={onFile} />
      ) : (
        <div className="w-full">
          <img src={photoPreview} alt="Preview" className="w-full rounded-lg object-cover" />
          <div className="mt-3 flex gap-3">
            <button className="flex-1 btn btn-outline" onClick={onReset}>Reprendre</button>
          </div>
        </div>
      )}

      {isLoading && <div className="mt-2 text-sm text-slate-500">Compression en cours…</div>}
      {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
    </div>
  );
}
