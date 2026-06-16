"use client"
import React, { useState } from "react";
import dynamic from "next/dynamic";

const MapPicker = dynamic(() => import("@/components/ReportForm/MapPicker"), { ssr: false });

export default function LocationPicker({
  lat,
  lng,
  address,
  loading,
  onChange,
}: {
  lat?: number | null;
  lng?: number | null;
  address?: string | null;
  loading?: boolean;
  onChange?: (lat: number, lng: number) => void;
}) {
  const [openMap, setOpenMap] = useState(false);

  return (
    <div>
      <div className="text-sm text-slate-600">
        {loading ? "Récupération de la position…" : `${lat?.toFixed(6) ?? "—"}, ${lng?.toFixed(6) ?? "—"}`}
      </div>
      <div className="text-sm text-slate-500 mt-1">{address ?? "Adresse introuvable"}</div>
      <div className="mt-3 flex gap-3">
        <button className="btn btn-outline" onClick={() => setOpenMap(true)}>Modifier</button>
      </div>

      {openMap && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="p-4 h-full flex flex-col">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Ajuster la position</h3>
              <button onClick={() => setOpenMap(false)}>Fermer</button>
            </div>
            <div className="mt-4 flex-1 rounded-md overflow-hidden">
              {lat != null && lng != null ? (
                // MapPicker will render a leaflet map with draggable marker
                // @ts-ignore dynamic import component
                <MapPicker lat={lat} lng={lng} onChange={(la: number, lo: number) => onChange?.(la, lo)} />
              ) : (
                <div className="w-full h-full flex items-center justify-center">Position non disponible</div>
              )}
            </div>
            <div className="mt-3 text-sm text-slate-500">Glisse le marqueur sur la carte pour ajuster.</div>
          </div>
        </div>
      )}
    </div>
  );
}
