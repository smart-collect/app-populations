"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, Home, Map, Plus, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/map", label: "Carte", icon: Map },
  { href: "/reports/new", label: "Signaler", icon: Plus, center: true },
  { href: "/reports", label: "Signalements", icon: ClipboardList },
  { href: "/profile", label: "Profil", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-40 mx-auto w-full max-w-[480px] border-t bg-background/95 backdrop-blur">
      <div className="flex h-[60px] items-end justify-around px-2 pb-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/home" && pathname.startsWith(`${item.href}/`));

          if (item.center) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative -top-3 flex flex-col items-center"
                aria-label={item.label}
              >
                <span className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                  <Icon className="size-6" />
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-2 text-[11px]",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="size-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
