import { BottomNav } from "@/components/Layout/BottomNav";
import { Header } from "@/components/Layout/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-[480px] bg-background">
      <Header />
      <main className="min-h-screen pt-14 pb-[72px]">{children}</main>
      <BottomNav />
    </div>
  );
}
