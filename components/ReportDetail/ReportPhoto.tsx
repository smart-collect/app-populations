"use client";
import React, { useState, useRef } from "react";

export default function ReportPhoto({ photoUrl, alt }: { photoUrl?: string | null; alt?: string }) {
  const [open, setOpen] = useState(false);
  const [dragStartY, setDragStartY] = useState<number | null>(null);
  const [dragDelta, setDragDelta] = useState(0);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setDragStartY(event.touches[0].clientY);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (dragStartY === null) return;
    setDragDelta(event.touches[0].clientY - dragStartY);
    if (overlayRef.current) {
      overlayRef.current.style.transform = `translateY(${Math.max(0, dragDelta)}px)`;
    }
  };

  const handleTouchEnd = () => {
    if (dragDelta > 100) {
      setOpen(false);
    }
    setDragStartY(null);
    setDragDelta(0);
    if (overlayRef.current) {
      overlayRef.current.style.transform = "translateY(0)";
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="overflow-hidden rounded-3xl bg-slate-100 aspect-[4/3] w-full"
      >
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={alt ?? "Photo du signalement"}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">
            Aucune photo
          </div>
        )}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4">
          <div
            ref={overlayRef}
            className="relative max-h-[calc(100vh-4rem)] w-full overflow-hidden rounded-3xl bg-black"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/90 px-3 py-2 text-slate-900"
            >
              Fermer
            </button>
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={alt ?? "Photo du signalement"}
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="flex h-full items-center justify-center p-6 text-white">Aucune photo disponible</div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
