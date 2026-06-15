"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/stores/auth.store";

export default function HomePage() {
  const user = useAuthStore((state) => state.user);
  const firstName = user?.name?.split(" ")[0] ?? "Citoyen";

  return (
    <div className="space-y-6 px-4 py-6">
      <section className="space-y-1">
        <h1 className="text-2xl font-bold">Bonjour {firstName} 👋</h1>
        <p className="text-sm text-muted-foreground">
          Bienvenue sur ton espace Smart-Collect.
        </p>
      </section>

      <section className="grid grid-cols-3 gap-3">
        <Card size="sm">
          <CardHeader>
            <CardTitle className="text-lg">0</CardTitle>
            <CardDescription>Signalements</CardDescription>
          </CardHeader>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle className="text-lg">0</CardTitle>
            <CardDescription>Collectés</CardDescription>
          </CardHeader>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle className="text-lg">—</CardTitle>
            <CardDescription>Taux</CardDescription>
          </CardHeader>
        </Card>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Derniers signalements</h2>
          <Button asChild variant="link" className="h-auto p-0">
            <Link href="/reports">Voir tout</Link>
          </Button>
        </div>
        <Card>
          <CardContent className="py-6 text-center text-sm text-muted-foreground">
            Aucun signalement pour le moment.
          </CardContent>
        </Card>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Bacs proches</h2>
          <Button asChild variant="link" className="h-auto p-0">
            <Link href="/map">Voir la carte</Link>
          </Button>
        </div>
        <Card>
          <CardContent className="py-6 text-center text-sm text-muted-foreground">
            La carte sera disponible ici (Phase 3 — Maeva).
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
