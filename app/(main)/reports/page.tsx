import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ReportsPage() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-muted-foreground">Mes signalements — Phase 5 (Oceane)</p>
      <Button asChild className="h-12">
        <Link href="/reports/new">Nouveau signalement</Link>
      </Button>
    </div>
  );
}
