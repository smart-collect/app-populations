import { BottomNav } from "@/components/Layout/BottomNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-[480px] bg-background flex flex-col">
      <main className="flex-1 pb-[72px] flex flex-col">{children}</main>
      <BottomNav />
    </div>
  );
}
