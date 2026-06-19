"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useNearbyBins } from "@/hooks/useNearbyBins";
import { type Bin } from "@/lib/api/bins";
import { BinoMascot } from "@/components/BinoMascot";

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

  // Get status color representation
  const getStatusColorClass = (status: Bin["status"]) => {
    switch (status) {
      case "NORMAL":
        return "bg-primary-light";
      case "ALMOST_FULL":
        return "bg-amber-500";
      case "FULL":
        return "bg-danger";
      case "FIRE":
        return "bg-red-950";
      default:
        return "bg-slate-400";
    }
  };

  const getStatusText = (bin: Bin) => {
    switch (bin.status) {
      case "NORMAL":
        return `Normal (${bin.fill_level}%)`;
      case "ALMOST_FULL":
        return `Presque plein (${bin.fill_level}%)`;
      case "FULL":
        return `Plein (${bin.fill_level}%)`;
      case "FIRE":
        return `Feu actif !`;
      default:
        return `Hors ligne`;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/50">
      {/* Green Topbar */}
      <div className="bg-primary px-5 pt-5 pb-4 flex items-center justify-between flex-shrink-0 shadow-md text-white">
        <h2 className="text-lg font-bold tracking-wide">Carte des bacs</h2>
        <button
          onClick={() => setMapCenter(lat && lng ? { lat, lng } : DEFAULT_CENTER)}
          className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 flex items-center justify-center text-white transition-all"
          title="Ma position"
        >
          🎯
        </button>
      </div>

      {/* Map Content */}
      <div className="relative flex-1 w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <MapView
            centerLat={mapCenter.lat}
            centerLng={mapCenter.lng}
            bins={filteredBins}
            userLocation={lat && lng ? { lat, lng } : undefined}
            onBinClick={(bin) => setActiveBin(bin)}
          />
        </div>

        {/* Floating search status info */}
        <div className="absolute left-0 top-4 z-10 flex w-full justify-center px-4 pointer-events-none">
          <div className="pointer-events-auto rounded-full bg-white/95 px-4 py-2.5 text-xs font-bold text-slate-700 shadow-md ring-1 ring-slate-100 flex items-center gap-2">
            {loading && (
              <>
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping" />
                <span>Recherche de votre position...</span>
              </>
            )}
            {!loading && error && (
              <div className="flex items-center gap-2 pointer-events-auto">
                <span className="text-danger">⚠️ {error}</span>
                <button
                  onClick={handleActivateLocation}
                  className="underline text-primary font-bold ml-1 active:opacity-70"
                >
                  Activer
                </button>
              </div>
            )}
            {!loading && !error && (
              <>
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span>Bacs à proximité ({filteredBins.length} trouvés)</span>
              </>
            )}
          </div>
        </div>

        {/* Loading overlay */}
        {(isLoading || loading) && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/10 backdrop-blur-[1px] pointer-events-none">
            <div className="rounded-2xl bg-white/90 px-5 py-3 text-center text-xs font-bold text-slate-800 shadow-md ring-1 ring-slate-100">
              Chargement des bacs...
            </div>
          </div>
        )}

        {/* Legend / bottom card - based on mockup 5 */}
        <div className="absolute bottom-4 left-4 right-4 z-10 bg-white/95 backdrop-blur-md border border-slate-100/80 shadow-xl rounded-2xl p-4 flex flex-col gap-3 pointer-events-auto">
          {/* Colors Legend */}
          <div className="flex gap-3 text-[10px] font-bold text-slate-500 flex-wrap border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Normal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>Presque plein</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-danger" />
              <span>Plein</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-950" />
              <span>Feu 🔥</span>
            </div>
          </div>

          {/* Active bin details or empty state */}
          {activeBin ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-800 text-sm">{activeBin.name}</h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 font-semibold">
                    <span className={`w-2 h-2 rounded-full ${getStatusColorClass(activeBin.status)}`} />
                    <span>Statut : {getStatusText(activeBin)}</span>
                    {distanceMeters > 0 && <span>· {distanceMeters.toFixed(0)} m</span>}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-lg flex-shrink-0">
                  🗑️
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button asChild size="sm" className="flex-1 h-9 font-bold text-xs rounded-lg shadow-sm">
                  <Link href={`/reports/new?bin=${activeBin.id}&desc=${encodeURIComponent("Bac plein : " + activeBin.name)}`}>
                    📍 Signaler ce bac
                  </Link>
                </Button>
                <Button
                  onClick={() => {
                    setActiveBin(null);
                  }}
                  variant="outline"
                  size="sm"
                  className="h-9 font-bold text-xs rounded-lg border-slate-200 text-slate-500 hover:bg-slate-50 bg-white"
                >
                  Fermer
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3.5 py-1">
              <BinoMascot pose="standing" size={44} className="flex-shrink-0 drop-shadow-sm" />
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Sélectionnez un bac sur la carte pour voir son niveau de remplissage et le signaler en cas de besoin.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
