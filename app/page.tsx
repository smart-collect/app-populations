import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BinoMascot } from "@/components/BinoMascot";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col justify-between bg-gradient-to-b from-primary to-primary-light p-0">
      {/* Top Section with Mascot & Branding */}
      <div className="flex flex-col items-center text-center text-white pt-14 px-6 pb-6">
        <BinoMascot pose="waving" size={120} className="drop-shadow-lg animate-bounce duration-1000" />
        <h1 className="text-3xl font-extrabold tracking-tight mt-4">Smart-Collect</h1>
        <p className="text-sm opacity-90 mt-1 font-medium">Douala plus propre, ensemble</p>
      </div>

      {/* Bottom Welcome Card */}
      <div className="bg-background rounded-t-[32px] px-6 pt-8 pb-10 shadow-2xl flex flex-col gap-6 ring-1 ring-slate-100">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Bienvenue 👋</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Signalez les bacs pleins, suivez la collecte près de chez vous et contribuez à une ville plus propre.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button asChild className="h-12 w-full font-bold text-sm rounded-xl transition-transform hover:scale-[1.01] active:scale-[0.99]">
            <Link href="/register">Créer un compte</Link>
          </Button>

          <Button asChild variant="outline" className="h-12 w-full font-bold text-sm border-primary text-primary hover:bg-primary/5 rounded-xl transition-transform hover:scale-[1.01] active:scale-[0.99]">
            <Link href="/login">J&apos;ai déjà un compte</Link>
          </Button>
        </div>

        <p className="text-center text-[11px] text-muted-foreground mt-2">
          En continuant, vous acceptez les conditions d&apos;utilisation
        </p>
      </div>
    </main>
  );
}
