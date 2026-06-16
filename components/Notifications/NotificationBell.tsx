"use client";

import Link from "next/link";
import { Bell } from "lucide-react";

export default function NotificationBell({ count }: { count: number }) {
  return (
    <Link href="/notifications" className="relative inline-flex items-center rounded-full bg-slate-900 p-3 text-white shadow-sm">
      <Bell className="h-5 w-5" />
      {count > 0 ? (
        <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-semibold text-white">
          {count}
        </span>
      ) : null}
    </Link>
  );
}
