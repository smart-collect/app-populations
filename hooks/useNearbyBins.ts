"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNearbyBins } from "@/lib/api/bins";

export function useNearbyBins(lat?: number, lng?: number) {
  return useQuery(
    ["nearby-bins", lat, lng],
    () => {
      if (!lat || !lng) {
        return Promise.resolve([] as const);
      }
      return fetchNearbyBins(lat, lng, 2000);
    },
    {
      enabled: typeof lat === "number" && typeof lng === "number",
      keepPreviousData: true,
      staleTime: 30_000,
    }
  );
}
