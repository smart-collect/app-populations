"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile, getStats, updateProfile } from "@/lib/api/users";

export function useProfile() {
  const queryClient = useQueryClient();

  const profileQuery = useQuery(["profile"], getProfile, {
    staleTime: 30_000,
  });

  const statsQuery = useQuery(["profile-stats"], getStats, {
    staleTime: 30_000,
  });

  const updateProfileMutation = useMutation(updateProfile, {
    onSuccess: (data) => {
      queryClient.setQueryData(["profile"], data);
      queryClient.invalidateQueries(["profile-stats"]);
    },
  });

  return {
    profile: profileQuery.data,
    profileLoading: profileQuery.isLoading,
    profileError: profileQuery.isError,
    stats: statsQuery.data,
    statsLoading: statsQuery.isLoading,
    statsError: statsQuery.isError,
    updateProfile: updateProfileMutation,
  };
}
