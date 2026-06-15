"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/stores/auth.store";

export default function ProfilePage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  function handleLogout() {
    logout();
    router.replace("/");
  }

  return (
    <div className="space-y-6 px-4 py-6">
      <Card>
        <CardHeader>
          <CardTitle>{user?.name ?? "Utilisateur"}</CardTitle>
          <CardDescription>{user?.email ?? "—"}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          {user?.phone && <p>Téléphone : {user.phone}</p>}
          <p>Phase 6 — profil complet à venir (Belya).</p>
        </CardContent>
      </Card>

      <Button
        variant="destructive"
        className="h-12 w-full"
        onClick={handleLogout}
      >
        Se déconnecter
      </Button>
    </div>
  );
}
