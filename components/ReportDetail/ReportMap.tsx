"use client";

import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const createMarkerIcon = () =>
  L.divIcon({
    className: "rounded-full bg-emerald-600 text-white shadow-lg",
    html: `<div class="h-8 w-8 rounded-full flex items-center justify-center text-sm">📍</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

export default function ReportMap({ lat, lng }: { lat: number; lng: number }) {
  const center: [number, number] = [lat, lng];

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200">
      <MapContainer
        center={center}
        zoom={14}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        dragging={false}
        zoomControl={false}
        attributionControl={false}
        className="h-72 w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={center} icon={createMarkerIcon()} />
      </MapContainer>
    </div>
  );
}
