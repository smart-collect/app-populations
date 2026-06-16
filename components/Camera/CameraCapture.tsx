"use client"
import React, { useRef } from "react";

export default function CameraCapture({ onSelect }: { onSelect: (f: File) => void }) {
  const ref = useRef<HTMLInputElement | null>(null);

  function open() {
    ref.current?.click();
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) onSelect(f);
  }

  return (
    <div className="w-full flex flex-col items-center">
      <button onClick={open} className="w-40 h-40 rounded-full bg-slate-100 flex items-center justify-center text-3xl">
        📷
      </button>
      <input ref={ref} type="file" accept="image/*" capture="environment" onChange={onChange} className="hidden" />
    </div>
  );
}
