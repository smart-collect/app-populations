import { apiClient } from "@/lib/api-client";
import { AuthUser } from "@/lib/auth";

export type ProfileStats = {
  totalReports: number;
  collectedReports: number;
  successRate: number;
};

export async function getProfile(): Promise<AuthUser> {
  return apiClient.get<AuthUser>("/auth/me");
}

export async function updateProfile(data: { name: string; phone?: string | null }): Promise<AuthUser> {
  return apiClient.patch<AuthUser>("/auth/me", data);
}

export async function getStats(): Promise<ProfileStats> {
  return apiClient.get<ProfileStats>("/auth/me/stats");
}
