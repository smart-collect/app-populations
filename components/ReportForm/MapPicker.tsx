"use client"
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Use a simple DivIcon to avoid asset issues
const createDivIcon = (label = "") => {
  return L.divIcon({
    className: "custom-map-marker",
    html: `<div style="background:#10b981;color:white;border-radius:12px;padding:6px 8px;font-size:14px">${label}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
  });
};

function DraggableMarker({ position, onDragEnd }: { position: [number, number]; onDragEnd: (lat: number, lng: number) => void }) {
  const [pos, setPos] = useState(position);
  useEffect(() => setPos(position), [position]);

  return (
    <Marker
      position={pos}
      icon={createDivIcon('📍')}
      draggable={true}
      eventHandlers={{
        dragend(e) {
          const marker = e.target;
          const latlng = marker.getLatLng();
          setPos([latlng.lat, latlng.lng]);
          onDragEnd(latlng.lat, latlng.lng);
        },
      }}
    />
  );
}

export default function MapPicker({ lat, lng, onChange }: { lat: number; lng: number; onChange: (lat: number, lng: number) => void }) {
  const center: [number, number] = [lat, lng];

  return (
    <MapContainer center={center} zoom={16} style={{ width: "100%", height: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <DraggableMarker position={center} onDragEnd={onChange} />
    </MapContainer>
  );
}
