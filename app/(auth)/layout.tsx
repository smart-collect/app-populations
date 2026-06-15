export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col px-6 py-10">
        <div className="mb-8 text-center">
          <p className="text-2xl font-bold text-primary">Smart-Collect</p>
          <p className="text-sm text-muted-foreground">
            Gestion intelligente de la collecte
          </p>
        </div>
        <div className="flex flex-1 flex-col justify-center">{children}</div>
      </div>
    </div>
  );
}
