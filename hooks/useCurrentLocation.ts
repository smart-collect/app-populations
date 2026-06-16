"use client"
import { useEffect, useState } from "react";

export function useCurrentLocation() {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Géolocalisation non disponible");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setLat(lat);
        setLng(lng);
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
          const data = await res.json();
          setAddress(data.display_name || null);
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError(err.message || "Erreur position");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  const setPosition = async (latNew: number, lngNew: number) => {
    setLat(latNew);
    setLng(lngNew);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latNew}&lon=${lngNew}`);
      const data = await res.json();
      setAddress(data.display_name || null);
    } catch (e) {
      console.error(e);
    }
  };

  return { lat, lng, address, loading, error, setPosition } as const;
}
