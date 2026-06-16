export default function MapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-[calc(100vh-116px)] w-full px-0">
      {children}
    </div>
  );
}
