import React from "react";
import { AuthUser } from "@/lib/auth";

function getInitials(name?: string) {
  if (!name) return "U";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

export default function ProfileHeader({ user }: { user: AuthUser | null }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-2xl font-semibold text-slate-700">
          {user?.name ? getInitials(user.name) : "U"}
        </div>
        <div>
          <h1 className="text-xl font-semibold text-slate-900">{user?.name ?? "Utilisateur"}</h1>
          <p className="text-sm text-slate-500">{user?.email ?? "Adresse email inconnue"}</p>
        </div>
      </div>
      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <div>Téléphone : {user?.phone ?? "Non renseigné"}</div>
        <div>Inscrit depuis : {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("fr-FR") : "—"}</div>
      </div>
    </div>
  );
}
