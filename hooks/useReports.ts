"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMyReports } from "@/lib/api/reports";

export function useReports(status?: string) {
  return useQuery({
    queryKey: ["my-reports", status],
    queryFn: () => fetchMyReports({ status }),
    refetchInterval: 30000,
    staleTime: 30000,
  });
}
