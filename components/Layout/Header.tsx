"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-40 mx-auto h-14 w-full max-w-[480px] border-b bg-background/95 shadow-sm backdrop-blur">
      <div className="flex h-full items-center justify-between px-4">
        <Link href="/home" className="text-lg font-bold text-primary">
          Smart-Collect
        </Link>

        <Link
          href="/notifications"
          className={cn(
            "relative flex size-10 items-center justify-center rounded-full",
            "text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          )}
          aria-label="Notifications"
        >
          <Bell className="size-5" />
        </Link>
      </div>
    </header>
  );
}
