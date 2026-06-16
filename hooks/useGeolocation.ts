"use client";

import { useEffect, useState } from "react";

interface GeolocationState {
  lat?: number;
  lng?: number;
  error?: string;
  loading: boolean;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({ loading: true });

  useEffect(() => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setState({ loading: false, error: "Géolocalisation non supportée." });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          loading: false,
        });
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setState({
            loading: false,
            error: "Autorisation de localisation refusée.",
          });
        } else {
          setState({
            loading: false,
            error: "Impossible de récupérer votre position.",
          });
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  }, []);

  return state;
}
