"use client";

import { Marker, Circle } from "react-leaflet";
import L from "leaflet";

interface UserLocationMarkerProps {
  location: {
    lat: number;
    lng: number;
  };
}

export function UserLocationMarker({ location }: UserLocationMarkerProps) {
  const icon = L.divIcon({
    html: `
      <span
        style="display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:50%;background:#3b82f6;border:2px solid #ffffff;box-shadow:0 0 0 4px rgba(59,130,246,0.25);"
      ></span>
    `,
    className: "leaflet-user-icon",
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });

  return (
    <>
      <Marker position={[location.lat, location.lng]} icon={icon} interactive={false} />
      <Circle
        center={[location.lat, location.lng]}
        radius={80}
        pathOptions={{
          color: "#3b82f6",
          fillColor: "#bfdbfe",
          fillOpacity: 0.18,
        }}
      />
    </>
  );
}
