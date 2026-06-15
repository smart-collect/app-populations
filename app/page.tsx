import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-[480px] flex-col items-center justify-center px-6">
      <div className="w-full space-y-6 text-center">
        <h1 className="text-3xl font-bold">Smart-Collect</h1>

        <p className="text-muted-foreground">
          Signalez les dépôts sauvages et trouvez les bacs publics à proximité.
        </p>

        <div className="flex flex-col gap-3">
          <Button asChild className="h-12">
            <Link href="/login">Se connecter</Link>
          </Button>

          <Button asChild variant="outline" className="h-12">
            <Link href="/register">S&apos;inscrire</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
