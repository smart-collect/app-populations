"use client";

import { create } from "zustand";
import { apiClient } from "@/lib/api-client";
import {
  type AuthUser,
  getToken,
  getUser,
  removeToken,
  removeUser,
  saveToken,
  saveUser,
} from "@/lib/auth";

type AuthResponse = {
  token: string;
  user: AuthUser;
};

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  phone?: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  isHydrated: boolean;
  hydrate: () => void;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  setSession: (token: string, user: AuthUser) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  isHydrated: false,

  hydrate: () => {
    set({
      token: getToken(),
      user: getUser(),
      isHydrated: true,
    });
  },

  setSession: (token, user) => {
    saveToken(token);
    saveUser(user);
    set({ token, user });
  },

  login: async (payload) => {
    set({ isLoading: true });
    try {
      const data = await apiClient.post<AuthResponse>("/auth/login", payload);
      saveToken(data.token);
      saveUser(data.user);
      set({ token: data.token, user: data.user, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (payload) => {
    set({ isLoading: true });
    try {
      const data = await apiClient.post<AuthResponse>("/auth/register", payload);
      saveToken(data.token);
      saveUser(data.user);
      set({ token: data.token, user: data.user, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: () => {
    removeToken();
    removeUser();
    set({ token: null, user: null });
  },
}));
