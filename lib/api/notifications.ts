import { apiClient } from "@/lib/api-client";

export type NotificationType =
  | "REPORT_ASSIGNED"
  | "REPORT_COLLECTED"
  | "REPORT_REJECTED"
  | "BIN_FULL_NEARBY"
  | "INFO";

export type NotificationItem = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  relatedId?: string | null;
  createdAt: string;
  read: boolean;
};

export async function getNotifications({ unreadOnly = false } = {}) {
  const query = unreadOnly ? "?unreadOnly=true" : "";
  return apiClient.get<NotificationItem[]>(`/notifications${query}`);
}

export async function markAsRead(id: string) {
  return apiClient.patch<{ success: true }>(`/notifications/${id}/read`);
}

export async function markAllAsRead() {
  return apiClient.patch<{ success: true }>(`/notifications/mark-all-read`);
}
