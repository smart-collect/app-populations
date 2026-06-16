"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getNotifications,
  markAllAsRead,
  markAsRead,
} from "@/lib/api/notifications";

export function useNotifications() {
  const queryClient = useQueryClient();

  const notificationsQuery = useQuery(["notifications"], () => getNotifications(), {
    refetchInterval: 60_000,
    staleTime: 30_000,
  });

  const markAsReadMutation = useMutation((id: string) => markAsRead(id), {
    onSuccess: () => queryClient.invalidateQueries(["notifications"]),
  });

  const markAllAsReadMutation = useMutation(() => markAllAsRead(), {
    onSuccess: () => queryClient.invalidateQueries(["notifications"]),
  });

  return {
    notifications: notificationsQuery.data ?? [],
    isLoading: notificationsQuery.isLoading,
    isError: notificationsQuery.isError,
    markAsRead: markAsReadMutation,
    markAllAsRead: markAllAsReadMutation,
  };
}
