"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, ZoomControl, useMap } from "react-leaflet";
import { useEffect } from "react";
import { BinMarker } from "@/components/Map/BinMarker";
import { UserLocationMarker } from "@/components/Map/UserLocationMarker";
import { type Bin } from "@/lib/api/bins";

function RecenterMap({ center }: { center: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center);
  }, [center, map]);

  return null;
}

interface MapViewProps {
  centerLat: number;
  centerLng: number;
  bins: Bin[];
  onBinClick: (bin: Bin) => void;
  userLocation?: { lat: number; lng: number };
}

export default function MapView({
  centerLat,
  centerLng,
  bins,
  onBinClick,
  userLocation,
}: MapViewProps) {
  const center: [number, number] = [centerLat, centerLng];

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={center}
        zoom={15}
        scrollWheelZoom={false}
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        <RecenterMap center={center} />
        {userLocation ? <UserLocationMarker location={userLocation} /> : null}
        {bins.map((bin) => (
          <BinMarker key={bin.id} bin={bin} onClick={() => onBinClick(bin)} />
        ))}
      </MapContainer>
    </div>
  );
}
