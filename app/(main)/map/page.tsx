"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { BinCard } from "@/components/BinCard";
import { MapControls } from "@/components/Map/MapControls";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useNearbyBins } from "@/hooks/useNearbyBins";
import { type Bin } from "@/lib/api/bins";

const MapView = dynamic(() => import("@/components/Map/MapView"), {
  ssr: false,
});

const DEFAULT_CENTER = { lat: 4.04, lng: 9.71 };

function getDistanceInMeters(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371e3;
  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lng2 - lng1);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export default function MapPage() {
  const { lat, lng, error, loading } = useGeolocation();
  const [selectedFilters, setSelectedFilters] = useState<Bin["status"][]>([
    "NORMAL",
    "ALMOST_FULL",
    "FULL",
    "FIRE",
    "OFFLINE",
  ]);
  const [activeBin, setActiveBin] = useState<Bin | null>(null);
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);

  const { data: bins = [], isLoading, isError } = useNearbyBins(lat, lng);

  useEffect(() => {
    if (typeof lat === "number" && typeof lng === "number") {
      setMapCenter({ lat, lng });
    }
  }, [lat, lng]);

  const filteredBins = useMemo(
    () => bins.filter((bin) => selectedFilters.includes(bin.status)),
    [bins, selectedFilters]
  );

  const distanceMeters = useMemo(() => {
    if (!activeBin || !lat || !lng) return 0;
    return getDistanceInMeters(lat, lng, activeBin.latitude, activeBin.longitude);
  }, [activeBin, lat, lng]);

  function handleActivateLocation() {
    if (typeof window === "undefined" || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      () => {
        window.location.reload();
      },
      () => {
        window.alert(
          "Impossible d’activer la localisation. Vérifiez les permissions de votre navigateur."
        );
      }
    );
  }

  return (
    <div className="relative h-[calc(100vh-116px)] w-full overflow-hidden">
      <div className="absolute inset-0">
        <MapView
          centerLat={mapCenter.lat}
          centerLng={mapCenter.lng}
          bins={filteredBins}
          userLocation={lat && lng ? { lat, lng } : undefined}
          onBinClick={(bin) => setActiveBin(bin)}
        />
      </div>

      <MapControls
        activeFilters={selectedFilters}
        onRecenter={() => {
          setMapCenter(lat && lng ? { lat, lng } : DEFAULT_CENTER);
        }}
        onFilterChange={setSelectedFilters}
      />

      <div className="pointer-events-none absolute left-0 top-14 z-40 flex w-full justify-center px-4">
        <div className="pointer-events-auto rounded-3xl bg-white/95 px-4 py-3 text-sm text-slate-700 shadow-lg ring-1 ring-slate-200">
          {loading && "Recherche de votre position..."}
          {!loading && error && (
            <div className="space-y-2">
              <p>{error}</p>
              <Button onClick={handleActivateLocation} size="sm">
                Activer la localisation
              </Button>
            </div>
          )}
          {!loading && !error && "Bacs publics autour de vous"}
        </div>
      </div>

      {(isLoading || loading) && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-900/10">
          <div className="rounded-3xl bg-white/95 px-6 py-4 text-center text-slate-800 shadow-lg ring-1 ring-slate-200">
            Chargement de la carte et des bacs...
          </div>
        </div>
      )}

      {isError && (
        <div className="pointer-events-none absolute inset-x-4 bottom-24 z-40 rounded-3xl bg-red-50 px-4 py-3 text-sm text-red-700 shadow-lg ring-1 ring-red-200">
          Impossible de charger les bacs pour le moment.
        </div>
      )}

      {activeBin ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40">
          <BinCard
            bin={activeBin}
            distanceMeters={distanceMeters}
            onViewDetails={() => window.alert("Voir détails du bac : " + activeBin.name)}
          />
        </div>
      ) : null}
    </div>
  );
}
