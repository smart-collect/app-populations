"use client";

import { Marker, Popup } from "react-leaflet";
import L, { divIcon } from "leaflet";
import { type Bin, type BinStatus } from "@/lib/api/bins";

const statusColorMap: Record<BinStatus, string> = {
  NORMAL: "#22c55e",
  ALMOST_FULL: "#f97316",
  FULL: "#ef4444",
  FIRE: "#dc2626",
  OFFLINE: "#6b7280",
};

const statusLabelMap: Record<BinStatus, string> = {
  NORMAL: "Normal",
  ALMOST_FULL: "Presque plein",
  FULL: "Plein",
  FIRE: "Alerte incendie",
  OFFLINE: "Hors ligne",
};

let markerStyleInjected = false;

function ensureMarkerStyles() {
  if (typeof document === "undefined" || markerStyleInjected) {
    return;
  }

  const style = document.createElement("style");
  style.textContent = `
    @keyframes marker-blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.25; }
    }
  `;
  document.head.appendChild(style);
  markerStyleInjected = true;
}

function createBinIcon(status: BinStatus) {
  ensureMarkerStyles();

  const color = statusColorMap[status] ?? "#6b7280";
  const isFire = status === "FIRE";
  const emoji = isFire ? "🔥" : "●";
  const html = `
    <span
      style="display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;background:${color};color:#fff;font-size:16px;box-shadow:0 0 0 4px rgba(255,255,255,0.65);${
        isFire ? "animation:marker-blink 1.2s infinite ease-in-out;" : ""
      }"
    >${emoji}</span>
  `;

  return divIcon({
    html,
    className: "leaflet-bin-icon",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -28],
  });
}

interface BinMarkerProps {
  bin: Bin;
  onClick: (bin: Bin) => void;
}

export function BinMarker({ bin, onClick }: BinMarkerProps) {
  const position: [number, number] = [bin.latitude, bin.longitude];

  return (
    <Marker
      position={position}
      icon={createBinIcon(bin.status)}
      eventHandlers={{ click: () => onClick(bin) }}
    >
      <Popup>
        <div className="space-y-2 text-sm">
          <div className="font-semibold">{bin.name}</div>
          <div>Status : {statusLabelMap[bin.status]}</div>
          <div>Niveau de remplissage : {bin.fill_level}%</div>
          <div>
            Dernière mesure :{' '}
            {new Date(bin.last_measurement_at).toLocaleString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
